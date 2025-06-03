import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './page/home/h5-checkout';
import ExplorePage from './page/home/h1-explore';
import ProductPage from './page/home/h2-store';
import CartPage from './page/home/h4-cart';
import LoginPage from './page/login/login';
import StoresPage from './page/home/h3-stores';
import StoreDetail from './page/home/h6-store';
import Logout from './page/login/logout';
import CreateAccount from './page/login/singup';
import ProtectedRoute from './utils/ProtectedRoute';
import AboutPage from './page/home/h7-about';
import ContactPage from './page/home/h8-contact';
import ProductDetail from './page/component/ProductDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                     element={<ExplorePage />} />
        <Route path="/product/:category_id" element={<ProductPage />} />
        <Route path="/product"              element={<ProductPage/>}/>
        <Route path="/stores/:store_id"     element={<StoreDetail/>}/>
        <Route path="/stores"               element={<StoresPage/>}/>
        <Route path="/about"                element={<AboutPage/>} />
        <Route path="/contact"              element={<ContactPage/>} />
        {/* Protected Routes */}
        <Route path="/checkout"             element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/cart"                 element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />
        
        {/* Public Routes */}
        <Route path="/login"                element={<LoginPage />} />
        <Route path="/signup"               element={<CreateAccount />} />
        <Route path="/logout"              element={<Logout/>}/>
        <Route path="/product_detail/:id"  element={<ProductDetail/>}/>
        {/* <Route path="/signup"              element={<SignUp/>}/> */}


      </Routes>
    </Router>
  );
}

export default App;