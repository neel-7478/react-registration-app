
// import './App.css';
import "../src/index.css"
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
