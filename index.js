import React from 'react'
import { render } from 'react-dom'
import Dashboard from './modules/Dashboard'
import Profile from './modules/Profile/Profile'
import SearchPeople from './modules/SearchPeople/SearchPeople'
import App from './modules/App'
import { Router, Route, hashHistory } from 'react-router'

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/profile" component={Profile}/>
		<Route path="/search_people" component={SearchPeople}/>
	</Router>
), document.getElementById('app'))
