import React from 'react';
import './css/login.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './css/App.css';
import login from './routes/login';
import main from './routes/main';
import users from './routes/users';
import customers from './routes/customers';
import appointments from './routes/appointments';
import reports from './routes/reports';
import search from './routes/search';






function App() {
	return (
		
			
			<main className="main full-height">
				<BrowserRouter>
					<Switch>
						<Route path="/" component={login} exact />
						<Route path="/main" component={main} />
						<Route path="/users" component={users} />
						<Route path="/customers" component={customers} />
						<Route path="/appointments" component={appointments} />
						<Route path="/reports" component={reports} />
						<Route path="/search" component={search} />

					</Switch>
				</BrowserRouter>
			</main>

	);
}
export default App;
