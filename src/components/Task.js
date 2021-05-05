import React from "react";

const Task = (props) => {
	const TASK_STATUS = ["Unstarted", "In Progress", "Completed"];
	function onStatusChange(e) {
		props.onStatusChange(props.task.id, e.target.value);
	}
	return (
		<div className="task">
			<div className="task-header">
				<div>{props.task.title}</div>
				<select value={props.task.status} onChange={onStatusChange}>
					{TASK_STATUS.map((status) => {
						return (
							<option key={status} value={status}>
								{status}
							</option>
						);
					})}
				</select>
			</div>
			<hr />
			<div className="task-body">{props.task.description}</div>
		</div>
	);
};

export default Task;
