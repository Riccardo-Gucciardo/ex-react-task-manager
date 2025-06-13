import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './components/TaskList'
import AddTask from './components/AddTask';
import TaskDetail from './components/TaskDetail';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Lista Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-task" className={({ isActive }) => (isActive ? 'active' : '')}>
              Aggiungi Task
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;