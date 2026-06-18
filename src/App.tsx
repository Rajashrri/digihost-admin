import { BrowserRouter as Router, Routes, Route } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import BlogTable from "./pages/Blog/BlogTable";
import ResetPasswordPage from "./pages/AuthPages/ResetPasswordPage";
import ForgetPasswordPage from "./pages/AuthPages/ForgetPasswordPage";
import OtpPage from "./pages/AuthPages/OtpPage";
import BlogCatogery from "./pages/Blog/BlogCatogery";
import AddCatogery from "./pages/Blog/AddCatogery";
import AddBlog from "./pages/Blog/AddBlog";
import EditCategory from "./pages/Blog/EditCategory";
import EditBlog from "./pages/Blog/EditBlog";

import SeoBlog from "./pages/Blog/SeoBlog";
import Contact from "./pages/List/contact";

import AuthGuard from "./components/AuthGuard";



export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
  element={
    <AuthGuard>
      <AppLayout />
    </AuthGuard>
  }
>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/add-blog-catogery" element={<AddCatogery />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/blog-catogery" element={<BlogCatogery />} />
            <Route path="/blog" element={<BlogTable />} />

<Route
  path="/edit-category/:id"
  element={<EditCategory />}
/>
<Route
  path="/edit-blog/:id"
  element={<EditBlog />}
/>
<Route
  path="/seo/:id"
  element={<SeoBlog />}
/>

            <Route path="/contact-list" element={<Contact />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/otp" element={<OtpPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
       <ToastContainer
       className="z-100" 

  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  theme="light"
/>
    </>
  );
}
