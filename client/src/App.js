import React from 'react';
import Game from './components/Game';
import {Route, Switch} from 'react-router-dom'
import {login, register, logout, validateToken } from './actions/auth'
import {ProtectedRoute, Login, Register, FetchUser, NavBar} from '@devpoint/pds-react-kit'

const App = () => (
  <div>
    <NavBar>
      <FetchUser>
        <Switch>
          <ProtectedRoute exact path = '/' component = {Game} />
          <Route 
            exact
            path = '/login'
            render + {props => <}
          />
        </Switch>
      </FetchUser>
    </NavBar>
  </div>
)



export default App;
