import logo from './logo.svg';
import './App.css';
import { Routes, Route, useRoutes } from "react-router-dom";
import Signup from './pages/signup';
import Login from './pages/login';
import routes from './routes';

function App() {
   const routing = useRoutes(routes);
  return routing;
}

export default App;
