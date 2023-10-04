import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../routes/HomePage";
import ContactPage from "../routes/ContactPage"
import SiteLayout from "../siteLayout"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
