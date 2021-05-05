import * as api from "../api";

export function createTaskSucceeded(task) {
	return {
		type: "CREATE_TASK_SUCCEEDED",
		payload: { task },
	};
}

export function createTask({ title, description, status = "Unstarted" }) {
	return (dispatch) => {
		api.createTask({ title, description, status }).then((res) => {
			dispatch(createTaskSucceeded(res.data));
		});
	};
}

export function editTaskSucceeded(task) {
	return {
		type: "EDIT_TASK_SUCCEEDED",
		payload: { task },
	};
}

export function editTask(id, params = {}) {
	return (dispatch, getState) => {
		const task = getTaskById(getState().tasks, id);
		const updatedTask = Object.assign({}, task, params);

		api.editTask(id, updatedTask).then((res) => {
			dispatch(editTaskSucceeded(res.data));
		});
	};
}

function fetchTasksStarted() {
	return {
		type: "FETCH_TASKS_STARTED",
	};
}

export function fetchTasksSucceeded(tasks) {
	return {
		type: "FETCH_TASKS_SUCCEEDED",
		payload: {
			tasks,
		},
	};
}

function fetchTasksFailed(error) {
	return {
		type: "FETCH_TASKS_FAILED",
		payload: {
			error,
		},
	};
}

export function fetchTasks() {
	return (dispatch) => {
		dispatch(fetchTasksStarted());

		api.fetchTasks()
			.then((res) => {
				setTimeout(() => {
					dispatch(fetchTasksSucceeded(res.data));
				}, 2000);
			})
			.catch((err) => {
				dispatch(fetchTasksFailed(err.message));
			});
	};
}

function getTaskById(tasks, id) {
	return tasks.tasks.find((task) => task.id === id);
}
