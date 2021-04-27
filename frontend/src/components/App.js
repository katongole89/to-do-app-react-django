import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './login'
import Register from './register'
import Main from './main'
import ErrorPage from './ErrorPage';
import {CookiesProvider} from 'react-cookie'

function App() {
  return <CookiesProvider>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch> 

    </Router>
  </CookiesProvider>
}

export default App
