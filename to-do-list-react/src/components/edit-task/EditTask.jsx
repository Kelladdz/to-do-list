import { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from '../add-task/add-task.module.css';
import css2 from '../add-task/deadline-modal.module.css';
import DeadlineIcon from '../../assets/deadline-icon.svg';
import Priority1 from '../../assets/priority-1.svg';
import Priority2 from '../../assets/priority-2.svg';
import Priority3 from '../../assets/priority-3.svg';
import Priority4 from '../../assets/priority-4.svg';
import Check from '../../assets/check-sign.svg';

export default function EditTask({ task, onSubmit, onEdit }) {
	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const [deadline, setDeadline] = useState(new Date(task.deadline));
	const [priority, setPriority] = useState(task.priority);
	const [deadlineShow, setDeadlineShow] = useState(false);
	const [priorityShow, setPriorityShow] = useState(false);
	let currentDate = new Date();
	const currentMonthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(deadline);
	const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format(deadline);
	const currentDayOfMonth = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(deadline);

	const handleChangeName = event => {
		setName(event.target.value);
		console.log('Name changed to: ', name);
	};

	const handleChangeDescription = event => {
		setDescription(event.target.value);
		console.log('Description changed to: ', description);
	};

	const handleChangeDeadline = date => {
		setDeadline(date);
		console.log('Deadline changed to: ', deadline);
	};

	const handleChangePriority = value => {
		console.log('Priority changed to: ', priority);
		setPriority(value);
		setPriorityShow(false);
	};

	const handleSubmit = event => {
		event.preventDefault();
		onEdit(task.id, name, description, deadline, priority);
		console.log('edited', name, description, deadline, priority);
		onSubmit();
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

	function checkDisplay(value) {
		if (priority === value) {
			return <img src={Check} style={{ transform: 'scale(0.8) translatex(-1.8rem)' }}></img>;
		} else return null;
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

	return (
		<div className={css['container']}>
			<form onSubmit={handleSubmit}>
				<input className={css['task-name']} value={name} onChange={handleChangeName} placeholder='Task Name' />
				<input
					className={css['task-description']}
					value={description}
					onChange={handleChangeDescription}
					placeholder='Description'
				/>
				<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<button className={css['body-button']} type='button' onClick={() => setDeadlineShow(true)}>
						<img src={DeadlineIcon}></img>
						{displayResult()}
					</button>
					<button className={css['body-button']} type='button' onClick={() => setPriorityShow(true)}>
						{flagDisplay(priority)}
						Priority {priority}
					</button>
					<button className={css['add-button']} style={{ backgroundColor: '#eaeaea' }} onClick={() => onSubmit()}>
						<div className={css['add-task-box']}>
							<p className={css['add-task']}>Cancel</p>
						</div>
						<div className={css['add-task-fixed-box']}>
							<p className={css['add-task-fixed']}>Cancel</p>
						</div>
					</button>
					<button className={css['add-button']} type='submit'>
						<div className={css['add-task-box']}>
							<p className={css['add-task']}>Save</p>
						</div>
						<div className={css['add-task-fixed-box']}>
							<p className={css['add-task-fixed']}>Save</p>
						</div>
					</button>

					<Modal
						show={deadlineShow}
						onHide={() => setDeadlineShow(false)}
						style={{
							width: '20rem',
							height: '26rem',
							boxShadow: '7px 7px black',
							borderRadius: '0.8125rem',
							border: '3px solid black',
							backgroundColor: 'white',
							position: 'absolute',
							top: '15.5rem',
							left: '37rem',
						}}>
						<Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
							<input value={deadline.toLocaleDateString()} readOnly />
						</Modal.Header>
						<Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
							<DatePicker
								calendarClassName={css2['calendar']}
								selected={deadline}
								onChange={handleChangeDeadline}
								minDate={new Date()}
								inline
							/>
						</Modal.Body>
					</Modal>
					<Modal
						show={priorityShow}
						onHide={() => setPriorityShow(false)}
						dialogClassName={css['dialog']}
						contentClassName={css['content']}
						scrollable={false}
						aria-labelledby='contained-modal-title-vcenter'>
						<button className={css['priority-button']} onClick={() => handleChangePriority(1)}>
							<img src={Priority1} style={{ transform: 'scale(0.6)' }}></img>
							<div className={css['priority-box']}>
								<p className={css['priority']}>Priority&nbsp;1</p>
							</div>
							<div className={css['priority-fixed-box']}>
								<p style={{ transform: 'translatex(-3.9rem)' }} className={css['priority-fixed']}>
									Priority&nbsp;1
								</p>
							</div>
							{checkDisplay(1)}
						</button>
						<button className={css['priority-button']} onClick={() => handleChangePriority(2)}>
							<img src={Priority2} style={{ transform: 'scale(0.6)' }}></img>
							<div className={css['priority-box']}>
								<p className={css['priority']}>Priority&nbsp;2</p>
							</div>
							<div className={css['priority-fixed-box']}>
								<p className={css['priority-fixed']}>Priority&nbsp;2</p>
							</div>
							{checkDisplay(2)}
						</button>
						<button className={css['priority-button']} onClick={() => handleChangePriority(3)}>
							<img src={Priority3} style={{ transform: 'scale(0.6)' }}></img>
							<div className={css['priority-box']}>
								<p className={css['priority']}>Priority&nbsp;3</p>
							</div>
							<div className={css['priority-fixed-box']}>
								<p className={css['priority-fixed']}>Priority&nbsp;3</p>
							</div>
							{checkDisplay(3)}
						</button>
						<button className={css['priority-button']} onClick={() => handleChangePriority(4)}>
							<img src={Priority4} style={{ transform: 'scale(0.6)' }}></img>
							<div className={css['priority-box']}>
								<p className={css['priority']}>Priority&nbsp;4</p>
							</div>
							<div className={css['priority-fixed-box']}>
								<p className={css['priority-fixed']}>Priority&nbsp;4</p>
							</div>
							{checkDisplay(4)}
						</button>
					</Modal>
				</div>
			</form>
		</div>
	);
}
