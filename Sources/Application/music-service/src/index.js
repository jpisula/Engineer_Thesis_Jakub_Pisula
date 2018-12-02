import React from 'react';
import ReactDOM, {history} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Article from './Components/Articles/Article';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Profile from './Components/Profile/Profile';
import ArticlesList from './Components/Articles/ArticlesList';
import { Events } from './Components/Events/Events';
import { Event } from './Components/Events/Event';
import { EventCreation } from './Components/Events/EventCreation';
import { EditEvent } from './Components/Events/EditEvent';
import { ArticleCreation } from './Components/Articles/ArticleCreation';
import { EditArticle } from './Components/Articles/EditArticle';
import { AdminPanel } from './Components/Admin/AdminPanel';
import { AdminPanelArticles } from './Components/Admin/AdminPanelArticles';
import { AdminPanelEvents } from './Components/Admin/AdminPanelEvents';

const Routes = () => (
  <div>
     <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/article/:id' component={Article}/>
        <Route path='/profile/:user_id' component={Profile}/>
        <Route path='/articles' component={ArticlesList}/>
        <Route path='/events' component={Events}/>
        <Route path='/event/:id' component={Event}/>
        <Route path='/event-creation' component={EventCreation}/>
        <Route path='/event-edit/:id' component={EditEvent}/>
        <Route path='/article-creation' component={ArticleCreation}/>
        <Route path='/article-edit/:id' component={EditArticle}/>
        <Route path='/AdminPanel' component={AdminPanel}/>
        <Route path='/AdminPanel-articles' component={AdminPanelArticles}/>
        <Route path='/AdminPanel-events' component={AdminPanelEvents}/>
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
