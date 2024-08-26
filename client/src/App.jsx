import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/User/Home';
import Profile from './Pages/User/Profile';
import MainLayout from './MainLayout';
import Signin from './Pages/User/Signin';
import Signup from './Pages/User/Signup';
import VerifyEmail from './Pages/User/VerifyEmail';
import SetupPassword from './Pages/User/SetupPassword';
import AddressForm from './Pages/User/AddressForm';
import Admin from './Pages/Admin/Admin';
import AllUsers from './Pages/Admin/AllUsers';
import AllProduct from './Pages/Admin/AllProduct';
import UploadProduct from './Pages/Admin/UploadProduct';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './AdminLayout';
import AdminRoute from './Pages/Admin/AdminRoutes';
import CreateCategory from './Pages/Admin/createCategory';
import ProductPage from './Pages/Product/ProductPage';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/profile' element={<MainLayout><Profile /></MainLayout>} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/setup-password' element={<SetupPassword />} />
        <Route path='/address' element={<MainLayout><AddressForm /></MainLayout>} />

        <Route path='/admin' element={<AdminRoute><AdminLayout><Admin /></AdminLayout></AdminRoute>}>
          <Route path='all-users' element={<AllUsers />} />
          <Route path='all-products' element={<AllProduct />} />
          <Route path='upload-product' element={<UploadProduct />} />
          <Route path='create-category' element={<CreateCategory />} />

        </Route>
        <Route path='/product/:id' element={<MainLayout><ProductPage /></MainLayout>} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
