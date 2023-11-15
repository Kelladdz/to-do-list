import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import EditTask from '../edit-task/EditTask';
import css from './task.module.css';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import Priority1 from '../../assets/priority-1.svg';
import Priority2 from '../../assets/priority-2.svg';
import Priority3 from '../../assets/priority-3.svg';
import Priority4 from '../../assets/priority-4.svg';

export default function Task({ task, onEdit, onDelete, selectedDate }) {
	let currentDate = new Date();
	const [showEdit, setShowEdit] = useState(false);
	const currentMonthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(selectedDate);
	const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format(selectedDate);
	const currentDayOfMonth = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(selectedDate);

	let content = null;

	const handleSubmit = () => {
		setShowEdit(false);
	};

	const handleDelete = () => {
		onDelete(task.id);
	};

	function displayResult() {
		if (currentMonth == currentDate.getMonth() + 1 && currentDayOfMonth == currentDate.getDate()) {
			return <p className={css['deadline']}>Today</p>;
		} else
			return (
				<p className={css['deadline']}>
					{currentDayOfMonth}&nbsp;{currentMonthShort}
				</p>
			);
	}

	function flagDisplay(value) {
		switch (value) {
			case 1:
				return <img src={Priority1} style={{ transform: 'scale(0.6) translatex(-0.4rem' }}></img>;
			case 2:
				return <img src={Priority2} style={{ transform: 'scale(0.6) translatex(-0.4rem' }}></img>;
			case 3:
				return <img src={Priority3} style={{ transform: 'scale(0.6) translatex(-0.4rem' }}></img>;
			case 4:
				return <img src={Priority4} style={{ transform: 'scale(0.6) translatex(-0.4rem' }}></img>;
		}
	}

	if (!showEdit)
		content = (
			<div className={css['container']}>
				<div className={css['left-side']}>
					<input className={css['task-radio']} type='radio' onChange={handleDelete}></input>
					<div className={css['info']}>
						<p className={css['task-name']}>{task.name}</p>
						<p className={css['task-description']}>{task.description}</p>
					</div>
					<div style={{ marginLeft: '2rem' }}>{flagDisplay(task.priority)}</div>
				</div>
				<div className={css['icons']}>
					<Button variant='link' className={css['deadline-link']}>
						<div className={css['deadline-box']}>
							<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<rect x='0.5' y='0.5' width='13' height='13' rx='2.5' fill='#EAEAEA' stroke='black' />
								<line x1='4' y1='3.5' x2='10' y2='3.5' stroke='black' />
								<line x1='8' y1='9.5' x2='10' y2='9.5' stroke='black' />
							</svg>
							{displayResult()}
						</div>
					</Button>
					<Button
						className={css['edit-icon']}
						variant='link'
						onClick={() => {
							setShowEdit(true);
						}}>
						<img src={EditIcon}></img>
					</Button>
					<Button onClick={handleDelete} className={css['delete-icon']} variant='link'>
						<img src={DeleteIcon}></img>
					</Button>
				</div>
			</div>
		);
	else content = <EditTask onEdit={onEdit} task={task} onSubmit={handleSubmit} />;

	return <>{content}</>;
}
