// Style
import './App.scss';

// Components
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import TableUsers from './components/TableUsers/TableUsers';
import { ToastContainer } from 'react-toastify';


function App() {
	return (
		<div className='app-container'>
			<Header />
			<Container>
				<TableUsers />
			</Container>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>


	);
}

export default App;
