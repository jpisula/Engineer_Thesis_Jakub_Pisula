import React from 'react';
import ReactDOM, {history} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Article from './Components/Articles/Article';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Profile from './Components/Profile/Profile';

const Routes = () => (
  <div>
     <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/article/:id' component={Article}/>
        <Route path='/profile/:user_id' component={Profile}/>
      </Switch>
  </div>
)

ReactDOM.render((
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
