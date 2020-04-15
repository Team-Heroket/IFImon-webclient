import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../offline/Login"
import Register from "../../offline/Register";
import MainMenu from "../../online/mainmenu/MainMenu";
import Settings from "../../online/profile/Settings";
import Leaderboards from "../../online/leaderboards/Leaderboards";
import SocialMode from "../../online/game/beforeGameStart/SocialMode";
import Lobby from "../../online/game/beforeGameStart/Lobby";
import CreateGame from "../../online/beforeGameStart/CreateGame"
import Quickplay from "../../online/quickplay/Quickplay";
import IntermediaryCounter from "../../online/game/beforeGameStart/IntermediaryCounter";
import Game from "../../online/game/afterGameStart/Game";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/offline"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /offline renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>


              <Route
                  path="/menu"
                  render={() => (
                      <GameGuard>
                          <MainMenu/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/leaderboards"
                  render={() => (
                      <GameGuard>
                          <Leaderboards/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/settings/:id"
                  render={() => (
                      <GameGuard>
                          <Settings/>
                      </GameGuard>
                  )}
              />

              <Route
                  path="/socialmode"
                  render={() => (
                      <GameGuard>
                          <SocialMode/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/lobby/:pokeCode"
                  render={() => (
                      <GameGuard>
                          <Lobby/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/createGame"
                  render={() => (
                      <GameGuard>
                          <CreateGame/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/intermediary/:pokeCode"
                  render={() => (
                      <GameGuard>
                          <IntermediaryCounter/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/game/:pokeCode"
                  render={() => (
                      <GameGuard>
                          <Game/>
                      </GameGuard>
                  )}
              />
              <Route
                  path="/quickplay"
                  render={() => (
                      <GameGuard>
                          <Quickplay/>
                      </GameGuard>
                  )}
              />


            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
                  path="/register"
                  exact
                  render={() => (
                      <LoginGuard>
                          <Register />
                      </LoginGuard>
                  )}
              />

            <Route path="/" exact render={() => <Redirect to={"/login"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
