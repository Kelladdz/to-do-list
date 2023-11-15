import { useEffect, useState } from 'react';
import CalendarCard from '../calendar-card/CalendarCard';
import { Button } from 'react-bootstrap';
import TasksList from '../tasks-list/TasksList';
import AddTask from '../add-task/AddTask';
import PlusSign from '../../assets/plus-sign-green.svg';
import css from './main-content.module.css';
import axios from 'axios';

export default function MainContent() {
	const [tasks, setTasks] = useState([]);
	const [showAdd, setShowAdd] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const fetchTasks = async () => {
		const response = await axios.get('https://app-todolist-web-pl-001.azurewebsites.net/tasks');
		setTasks(response.data);
	};

	const addTask = async (name, description, deadline, priority) => {
		const response = await axios.post('https://app-todolist-web-pl-001.azurewebsites.net/API/tasks', {
			name,
			description,
			deadline,
			priority,
		});

		const updatedTasks = [...tasks, response.data];
		setTasks(updatedTasks);
		console.log('need to add a task', tasks);
	};

	const editTaskById = async (id, newName, newDescription, newDeadline, newPriority) => {
		const response = await axios.put(`https://app-todolist-web-pl-001.azurewebsites.net/API/${id}`, {
			name: newName,
			description: newDescription,
			deadline: newDeadline,
			priority: newPriority,
		});
		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				return { ...task, ...response.data };
			}
			return task;
		});
		setTasks(updatedTasks);
	};

	const handleSubmit = () => {
		setShowAdd(false);
	};

	const deleteTaskById = async id => {
		await axios.delete(`https://app-todolist-web-pl-001.azurewebsites.net/API/${id}`);
		const updatedTasks = tasks.filter(task => {
			return task.id !== id;
		});
		setTasks(updatedTasks);
	};

	const selectDate = date => {
		setSelectedDate(date);
	};

	useEffect(() => {
		fetchTasks();
	}, [tasks]);

	let content = null;
	let addBtn = (
		<div>
			<button onClick={() => setShowAdd(true)} className={css['add-button']}>
				<div className={css['add-task-box']}>
					<p className={css['add-task']}>Add Task</p>
				</div>
				<div className={css['add-task-fixed-box']}>
					<p className={css['add-task-fixed']}>Add Task</p>
				</div>
			</button>
		</div>
	);

	if (showAdd) {
		content = <AddTask onSubmit={handleSubmit} onAdd={addTask} />;
		addBtn = null;
	}

	return (
		<div style={{ display: 'flex' }}>
			<CalendarCard changeDate={selectDate} />
			<div>
				<TasksList selectedDate={selectedDate} onEdit={editTaskById} tasks={tasks} onDelete={deleteTaskById} />
				<div>{content}</div>
			</div>
			{addBtn}
			{/* <Button style={{ marginLeft: '5rem' }}>View</Button> */}
		</div>
	);
}
