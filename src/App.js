import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './css/App.css';
import login from './routes/login';
import main from './routes/main';
import nav from './routes/nav';


function App() {
	return (
		
			
			<main className="main full-height">
				<Switch>
					<Route path="/" component={login} exact />
					<Route path="/main" component={main} />
				</Switch>
			</main>

	);
}
export default App;
