import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Create2 from './editcontact/EditContact2';
import Create from './editcontact/EditContact';
import List from './list/List';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';


function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapsed = (e) => {
    e.preventDefault();
    setIsNavCollapsed(!isNavCollapsed);
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>Goontacts</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded={!isNavCollapsed ? true : false } 
            aria-label="Toggle navigation"
            onClick={handleNavCollapsed}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''}  navbar-collapse`} 
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
             <Link className="nav-link" activeclassname="active" aria-current="page" to="/">List</Link>
             </li>
             <li className="nav-item">
             <Link className="nav-link" activeclassname="active" to="/create">Create</Link>
             </li>
             <li className="nav-item">
             <Link className="nav-link" activeclassname="active" to="/create2">Create2</Link>
             </li>
           </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/create2">
          <Create2 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
