import { Navbar, Container, Nav } from 'react-bootstrap';
import css from './header.module.css';

export default function Header() {
	return (
		<Navbar expand='lg' className={css['navbar']}>
			<Container>
				<Navbar.Brand href='#home' className={css['app-name-box']}>
					<div className={css['brand-name-box']}>
						<p className={css['brand-name']}>To-Do List</p>
					</div>
					<div className={css['brand-name-fixed-box']}>
						<p className={css['brand-name-fixed']}>To-Do List</p>
					</div>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
