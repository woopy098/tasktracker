import {Component} from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import AddTask from './components/addtask';
import ListTask from './components/tasklist'
import './App.css';

class App extends Component {
    render() {
      return (
        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav mr-auto">
                <Link to="/add" className="navbar-brand">Add</Link>
                <Link to="/list" className="navbar-brand">list</Link>
              </div>
            </nav>
            <Routes>
              <Route path="/add" element={<AddTask />} />
              <Route path="/list" element={<ListTask />} />
              
            </Routes>
          </Router>
        </div>
      );
    }
  }
export default App;
