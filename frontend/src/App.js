import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/shop' element={<h1>Shop</h1>} />
          <Route path='/cart' element={<h1>Cart</h1>} />
          <Route path='/register' element={<h1>Register</h1>} />
          <Route path='/auth' element={<h1>Sign In</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
