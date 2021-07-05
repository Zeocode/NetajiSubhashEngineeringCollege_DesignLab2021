
import './App.css';
import {Route, Switch} from "react-router-dom"
import Register from './Components/register';
import Login from "./Components/login"; 
import Home from "./Components/home"; 
import Profile from "./Components/profile"; 



function App() {

  
  return (
  <div>
    
      <Switch>
      <Route exact path="/" component={Register} /> 
      <Route path="/login" component={Login} /> 
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      </Switch>
    
    
  </div>
  );
}



export default App;
