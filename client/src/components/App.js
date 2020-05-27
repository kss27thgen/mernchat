import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Top from "./pages/Top";
import Chat from "./pages/Chat";
import UserState from "../context/user/userState";
import ErrorState from "../context/error/errorState";

function App() {
	return (
		<ErrorState>
			<UserState>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Top} />
						<Route path="/chat" component={Chat} />
					</Switch>
				</BrowserRouter>
			</UserState>
		</ErrorState>
	);
}

export default App;
