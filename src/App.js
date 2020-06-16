import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './css/App.css';
import login from './routes/login';
import main from './routes/main';
import users from './routes/users';
import customers from './routes/customers';
import appointments from './routes/appointments';




function App() {
	return (
		
			
			<main className="main full-height">
				<Switch>
				<Route path="/" component={login} exact />
				<Route path="/main" component={main} />
				<Route path="/users" component={users} />
				<Route path="/customers" component={customers} />
				<Route path="/appointments" component={appointments} />

				</Switch>
			</main>

	);
}
export default App;
