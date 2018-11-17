import { Switch, Route } from 'react-router-dom'
import App from './App';
import Article from './Components/Articles/article';



const Routes = () => (
    <div>
       <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/article/:number' component={Article}/>
    </Switch>
    </div>
  )