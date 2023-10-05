import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../routes/HomePage";
import ContactPage from "../routes/ContactPage"
import BlogPage from "../routes/BlogPage"
import NavigationLayout from "../navigationLayout"
function NavBar(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    )
};
export default NavBar;