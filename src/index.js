import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import tasksReducer from "./reducers";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = (state = {}, action) => {
	return {
		tasks: tasksReducer(state.tasks, action),
	};
};

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept("./App", () => {
		const NextApp = require("./App").default;
		ReactDOM.render(
			<Provider store={store}>
				<NextApp />
			</Provider>,
			document.getElementById("root")
		);
	});

	module.hot.accept("./reducers", () => {
		const nextRootReducer = require("./reducers").default;
		store.replaceReducer(nextRootReducer);
	});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
