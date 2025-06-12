// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';


function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Lista Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-task" activeClassName="active">
              Aggiungi Task
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;