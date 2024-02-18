import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../routes/HomePage";
import ContactPage from "../routes/ContactPage";
import BlogPage from "../routes/BlogPage";
import NavigationLayout from "./navigationLayout";
import StaffPage from "../routes/Staff";
import ServicesPage from "../routes/Services";
import Login from "../routes/Login";
import Register from "../routes/Register";
function NavBar() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/services" element={<ServicesPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default NavBar;
