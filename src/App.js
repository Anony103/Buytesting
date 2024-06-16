import {
  createBrowserRouter, 
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route, 
  RouterProvider,
} from 'react-router-dom'
import React from 'react';

// pages
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import CheckMail from './pages/CheckMail';
import ProductDescription from './pages/ProductDescription';
import SellerSignIn from './pages/Seller/SellerSignIn';
import SellerSignUp from './pages/Seller/SellerSignUp';
import SellerCheckMail from './pages/Seller/SellerCheckMail';
import SellerEmailVerification from './pages/Seller/SellerEmailVerification';
import Loader from './components/loader';
import { appStore, authStore } from './store';
import { Toaster } from 'react-hot-toast';
import UserAccount from './pages/UserAccount';
import BookMark from './pages/BookMark';
import SellerProfile from './pages/SellerProfile';
import SellerLandingPage from './pages/Seller/SellerLandingPage';
import SellerMyShop from './pages/Seller/SellerMyShop';
import SellerMyShopProducts from './pages/Seller/SellerMyShopProducts';
import SellerViewProducts from './pages/Seller/SellerViewProducts';
import SellerMyProfile from './pages/Seller/SellerMyProfile';
import AgentSignIn from './pages/Agents/AgentSignIn';
import AgentForgotPassword from './pages/Agents/AgentForgotPassword';
import AgentCheckMail from './pages/Agents/AgentCheckMail';
import AgentNewPassword from './pages/Agents/AgentNewPassword';
import AgentDashboard from './pages/Agents/AgentDashboard';
import AgentSellers from './pages/Agents/AgentSellers';
import AgentSellerProfile from './pages/Agents/AgentSellerProfile';
import AgentAddSellers from './pages/Agents/AgentAddSeller';
import AgentEditSellerInfo from './pages/Agents/AgentEditSellerInfo';
import AgentSellersEmailVerification from './pages/Agents/AgentSellersEmailVerification';
import AgentSellerSetPassword from './pages/Agents/AgentSellerSetPassword';
import AgentSettings from './pages/Agents/AgentSettings';
import AdminSignIn from './pages/Admins/AdminSignIn';
import AdminForgotPassword from './pages/Admins/AdminForgotPassword';
import AdminCheckMail from './pages/Admins/AdminCheckMail';
import AdminNewPassword from './pages/Admins/AdminNewPassword';
import AdminDashboard from './pages/Admins/AdminDashboard';
import SellerAddProducts from './pages/Seller/SellerAddProducts';
import AdminBuyers from './pages/Admins/AdminBuyers';
import AdminSellerProfile from './pages/Admins/AdminSellerProfile';
import AdminAgents from './pages/Admins/AdminAgents';
import AdminAddAgent from './pages/Admins/AdminAddAgent';
import AdminEditProfile from './pages/Admins/AdminEditProfile';
import AdminSellers from './pages/Admins/AdminSellers';
import AdminAgentProfile from './pages/Admins/AdminAgentProfile';
import AdminAgentProfileII from './pages/Admins/AdminAgentProfileII';
import AdminCategories from './pages/Admins/AdminCategories';
import AdminAddCategories from './pages/Admins/AdminAddCategories';
import AdminSettings from './pages/Admins/AdminSettings';
import AdminSubscriptions from './pages/Admins/AdminSubscriptions';
import AdminBuyerProfile from './pages/Admins/AdminBuyerProfile';
import Categories from './components/Categories';
import SellerProfilePages from './components/SellerProfilePages';
import Subscription from './pages/Seller/Subscription';
import SellerEditProduct from './pages/Seller/SellerEditProduct';


const Auth = () => {
  const auth = authStore(state => state.user?.token);
  if(auth) {
    return <Navigate to='/' />
  }
  return <Outlet />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='auth'>
        <Route element={<Auth />}>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='new-password' element={<NewPassword />} />
        </Route>
        <Route path='email-verification' element={<EmailVerification />} />
        <Route path='check-mail' element={<CheckMail />} />
      </Route>
      <Route path='product-description/:id' element={<ProductDescription />} />
      <Route path='profile' element={<UserAccount />} />
      <Route index path='/seller-profile/:id' element={<SellerProfilePages />} />
      <Route index path='/' element={<LandingPage />} />

      <Route path='bookmark' element={<BookMark />} />
      <Route path='categories/:id' element={<Categories />} />

      <Route path='seller'>
        <Route index element={<Navigate to='auth/sign-in' />} />
        <Route path='auth'>
          <Route element={<Auth />}>
            <Route path='sign-in' element={<SellerSignIn />} />
            <Route path='sign-up' element={<SellerSignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='check-mail' element={<SellerCheckMail />} />
          </Route>
          <Route path='profile' element={<SellerProfile />} />
          <Route path='email-verification' element={<SellerEmailVerification />} />
        </Route>
        <Route path='my-shop'>
          <Route index element={<SellerMyShop />} />
          <Route path='add-products' element={<SellerAddProducts />} />
          <Route path='my-products' element={<SellerMyShopProducts />} />
          <Route path='product/:id' element={<ProductDescription />} />
          <Route path='view-product/:id' element={<SellerViewProducts />} />
          <Route path='edit/:id' element={<SellerEditProduct />} />
        </Route>
        <Route path='profile' element={<SellerMyProfile />} />
        <Route path='subscription' element={<Subscription />} />
      </Route>
      
      <Route path='agent'>
        {/* <Route index element={<AgentDashboard />} /> */}
        <Route index element={<Navigate to='auth/sign-in' />} />
        <Route path='auth'>
          <Route element={<Auth />}>
            <Route path='sign-in' element={<AgentSignIn />} />
            <Route path='forgot-password' element={<AgentForgotPassword />} />
            <Route path='check-mail' element={<AgentCheckMail />} />
            <Route path='new-password' element={<AgentNewPassword />} />
          </Route>
        </Route>
        <Route path='dashboard' element={<AgentDashboard />} />
        <Route path='sellers'>
          <Route index element={<AgentSellers />} />
          <Route path='profile/:id' element={<AgentSellerProfile />} />
          <Route path='add' element={<AgentAddSellers />} />
          <Route path='edit/:id' element={<AgentEditSellerInfo />} />
          <Route path='email-verification' element={<AgentSellersEmailVerification />} />
        </Route>
        <Route path='set-password' element={<AgentSellerSetPassword />} />
        <Route path='settings' element={<AgentSettings />} />
      </Route>

      <Route path='admin'>
        <Route index element={<Navigate to='auth/sign-in' />} />
        <Route path='auth'>
          <Route element={<Auth />}>
            <Route path='sign-in' element={<AdminSignIn />} />
            <Route path='forgot-password' element={<AdminForgotPassword />} />
            <Route path='check-mail' element={<AdminCheckMail />} />
            <Route path='new-password' element={<AdminNewPassword />} />
          </Route>
          {/* <Route path='profile' element={<SellerProfile />} /> */}
        </Route>
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='buyers'>
          <Route index element={<AdminBuyers />} />
          <Route path='buyer-profile' element={<AdminBuyerProfile />} />
        </Route>
        <Route path='buyer-profile' element={<AdminBuyerProfile />} />
        <Route path='sellers' element={<AdminSellers />} />
        <Route path='seller-profile' element={<AdminSellerProfile />} />
        <Route path='agents'>
          <Route index element={<AdminAgents />} />
          <Route path='add-agent' element={<AdminAddAgent />} />
          <Route path='profile/:id' element={<AdminAgentProfile />} />
          <Route path='agent-profile-2' element={<AdminAgentProfileII />} />
        </Route>
        <Route path='edit-profile' element={<AdminEditProfile />} />
        <Route path='subscriptions' element={<AdminSubscriptions />} />
        <Route path='categories'>
          <Route index element={<AdminCategories />} />
          <Route path='add-category' element={<AdminAddCategories />} />
          <Route path='edit-category' element={<AdminAddCategories />} />
        </Route>
        <Route path='settings' element={<AdminSettings />} />
      </Route>
      
      
      
      
    </React.Fragment>
  )
)

function App() {
  const loader = appStore(state => state.loader);
  return (
    <>
      {loader && <Loader />}
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App