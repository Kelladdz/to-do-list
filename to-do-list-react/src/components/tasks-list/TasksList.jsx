import React from 'react';
import Task from '../task/Task';

export default function TasksList({ tasks, onEdit, onDelete, selectedDate }) {
	function getSortValue(task) {
		return task.priority;
	}
	const renderedTasks = tasks
		.filter(
			task =>
				new Date(task.deadline).getDate() === new Date(selectedDate).getDate() &&
				new Date(task.deadline).getMonth() === new Date(selectedDate).getMonth()
		)
		.sort((a, b) => {
			const valueA = getSortValue(a);
			const valueB = getSortValue(b);
			return valueA - valueB;
		})
		.map(task => {
			return <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} selectedDate={selectedDate} />;
		});

	return (
		<>
			<div>{renderedTasks}</div>
		</>
	);
}
