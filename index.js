import React from 'react'
import { render } from 'react-dom'
import Dashboard from './modules/Dashboard'
import Profile from './modules/Profile'
import App from './modules/App'
import { Router, Route, hashHistory } from 'react-router'

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/profile" component={Profile}/>
	</Router>
), document.getElementById('app'))
