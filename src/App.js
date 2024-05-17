import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import EditData from './components/EditData';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/registration' element={<Register />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/data/:id' element={<EditData />} />
            
            <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;