import "./App.css";
import ArticlesDetails from "./pages/articleDetails/ArticlesDetails";
import Homepage from "./pages/home/Homepage";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/register/RegisterUser";
import { Toaster } from "react-hot-toast";
import LoginUser from "./pages/login/Login";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/components/comments/Comments";
import ManagePosts from "./pages/admin/components/posts/ManagePosts";
import EditPost from "./pages/admin/components/posts/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategory from "./pages/admin/screens/categories/EditCategory";

function App() {
  return (
    <div className="font-opensans">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/blog/:slug" element={<ArticlesDetails />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="categories/manage" element={< Categories/>} />
          <Route path="categories/manage/edit/:slug" element={<EditCategory />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
