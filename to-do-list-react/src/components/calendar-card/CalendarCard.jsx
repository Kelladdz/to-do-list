import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import css from './calendar-card.module.css';

export default function CalendarCard({ changeDate }) {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate);
	const currentDayOfMonth = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(selectedDate);
	const currentDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate);

	function getPreviousDay(date) {
		const previous = new Date(selectedDate);
		previous.setDate(previous.getDate() - 1);
		setSelectedDate(previous);
		changeDate(previous);
	}

	function getNextDay(date) {
		const next = new Date(selectedDate);
		next.setDate(next.getDate() + 1);
		setSelectedDate(next);
		changeDate(next);
	}

	function getCurrentDay() {
		const current = new Date();
		setSelectedDate(current);
		changeDate(current);
	}

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	return (
		<div className={css['container']}>
			<div className={css['calendar']}>
				<div className={css['month-field']}>
					<div className={css['clips']}>
						<div className={css['circle']}>
							<div className={css['clip']}></div>
						</div>
						<div className={css['circle']}>
							<div className={css['clip']}></div>
						</div>
					</div>
					<div className={css['month-name-box']}>
						<p className={css['month-name']}>{currentMonth.toUpperCase()}</p>
					</div>
					<div className={css['month-name-fixed-box']}>
						<p className={css['month-name-fixed']}>{currentMonth.toUpperCase()}</p>
					</div>
				</div>
				<div className={css['day-field']}>
					<p className={css['day-of-month']}>{currentDayOfMonth}</p>
					<p className={css['day-of-week']}>{currentDayOfWeek}</p>
				</div>
			</div>
			<div className={css['buttons']}>
				<button className={css['previous-button']} onClick={() => getPreviousDay(selectedDate)}>
					<div className={css['previous-box']}>
						<p className={css['previous']}>Previous day</p>
					</div>
					<div className={css['previous-fixed-box']}>
						<p className={css['previous-fixed']}>Previous day</p>
					</div>
				</button>

				<button className={css['today-button']} onClick={getCurrentDay}>
					<div className={css['today-box']}>
						<p className={css['today']}>Today</p>
					</div>
					<div className={css['today-fixed-box']}>
						<p className={css['today-fixed']}>Today</p>
					</div>
				</button>
				<button className={css['next-button']} onClick={() => getNextDay(selectedDate)}>
				<div className={css['Next-box']}>
						<p className={css['next']}>Next</p>
					</div>
					<div className={css['next-fixed-box']}>
						<p className={css['next-fixed']}>Next</p>
					</div>
				</button>
			</div>
			<p>{selectedDate.toLocaleDateString()}</p>
		</div>
	);
}
