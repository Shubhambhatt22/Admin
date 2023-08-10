import './App.css';
import Navbar from './components/Nav/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/product/ProductList';


function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' Component={Dashboard}/>
          <Route path='/product' Component={ProductList}/>
        </Routes>
      
    </div>
  );
}

export default App;
