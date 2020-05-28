import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Top from "./pages/Top";
import Chat from "./pages/Chat";
import UserState from "../context/user/userState";
import ErrorState from "../context/error/errorState";
import RoomState from "../context/room/roomState";

function App() {
	return (
		<ErrorState>
			<RoomState>
				<UserState>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Top} />
							<Route path="/chat" component={Chat} />
						</Switch>
					</BrowserRouter>
				</UserState>
			</RoomState>
		</ErrorState>
	);
}

export default App;
