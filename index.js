import React from 'react'
import { render } from 'react-dom'
import Dashboard from './modules/Dashboard'
import App from './modules/App'
import { Router, Route, hashHistory } from 'react-router'

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="/dashboard" component={Dashboard}/>
	</Router>
), document.getElementById('app'))
