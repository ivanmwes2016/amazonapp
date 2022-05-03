import React from 'react'
import './main.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from './components/Home';
import ProductScreen from './components/productScreen';


function App() {

  return (
    <BrowserRouter>
    
      <div className="App">
        <header className="App-header">
        <Link to='/'>amazona</Link>
        </header>
        <Routes>
          <Route path='/' element={<HomeScreen />}  />
          <Route path='/product/:slug' element={<ProductScreen/>} />
        </Routes>
        

        
      </div>
    </BrowserRouter>
  );
}

export default App;
