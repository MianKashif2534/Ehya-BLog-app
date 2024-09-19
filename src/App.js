import "./App.css";
import ArticlesDetails from "./pages/articleDetails/ArticlesDetails";
import Homepage from "./pages/home/Homepage";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/register/RegisterUser";
import { Toaster } from "react-hot-toast";
import LoginUser from "./pages/login/Login";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <div className="font-opensans">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/blog/:slug" element={<ArticlesDetails />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
