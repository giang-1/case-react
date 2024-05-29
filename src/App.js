
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './component/main-layout';
import Register from './login/register';
// import Header from './component/header';
// import Login from './login/login';
import Restaurant from './category/restaurant';
import CartList from './component/cart-list';
import ShowVisitLocationList from './category/visitLocation';
import Home from './component/home';
import Restaurant2 from './category/restaurant2';
import OderList from './component/oderList';
import { ToastContainer } from 'react-toastify';
import NotFound from './component/notFound';

function App() {
  return (
    <div className='container'>
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/oderList' element={<OderList />} />
        <Route path='/' element={<Restaurant />} />
        <Route path='/register' element={<Register />} />
        <Route path='/restaurantAdmin' element={<Restaurant />} />
        <Route path='/cartSlice' element={<CartList />} />
        {/* <Route path='/visitLocation' element={<ShowVisitLocationList />} /> */}
        {/* <Route path='/restaurant' element={<Restaurant />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Restaurant /> */}
    </div>
  );
}

export default App;
