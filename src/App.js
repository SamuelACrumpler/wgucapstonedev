import React from 'react';
import './css/login.css';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import login from './routes/login';
import main from './routes/main';
import users from './routes/users';
import customers from './routes/customers';
import appointments from './routes/appointments';
import reports from './routes/reports';
import search from './routes/search';
import history from './routes/history';


function App() {
	return (
			<main className="main full-height">
				<BrowserRouter>
					<Switch>
						<Route path="/" component={withRouter(login)} exact />
						<Route path="/main" component={withRouter(main)} />
						<Route path="/users" component={withRouter(users)} />
						<Route path="/customers" component={withRouter(customers)} />
						<Route path="/appointments" component={withRouter(appointments)} />
						<Route path="/reports" component={withRouter(reports)} />
						<Route path="/search" component={withRouter(search)} />

					</Switch>
				</BrowserRouter>
			</main>

	);
}
export default App;
