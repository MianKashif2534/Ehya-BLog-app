//header
import React, { useEffect, useState } from "react";
import { images } from "../../../../constants";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaComments, FaUser } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import NavItem from "../NavItem";
import NavItemCollapse from "../NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const userState = useSelector((state) => state.user);
  const windowSize = useWindowSize();
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  // console.log(activeNavName)

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ updateData, slug, token }) => {
        return createPost({ updateData, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post is Created");
        navigate(`/admin/posts/manage/edit/${data.slug}`)
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message);
      },
    });

  useEffect(() => {
    if (windowSize.width >= 1024) {
      setIsMenuActive(true);
    } else {
      setIsMenuActive(false);
    }
  }, [windowSize.width]);

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  const handleCreatePost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex justify-between items-center p-4 w-full h-fit lg:h-full lg:max-w-[300px] lg:flex-col lg:justify-start lg:items-start">
      {/* logo */}
      <Link to="/">
        <img src={images.Logo} alt="" className="w-16 lg:hidden" />
      </Link>
      {/* menu burger icon  */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="h-6 w-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebarcontainer */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:w-full lg:h-full lg:static">
          {/* underlay  */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar */}
          <div className="fixed left-0 bottom-0 top-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:h-full lg:w-full lg:static lg:p-6">
            <Link to="/">
              <img src={images.Logo} alt="" className="w-16" />
            </Link>

            <h4 className="text-[#C7C7C7] mt-10 font-bold">MAIN MENU</h4>
            <div className="flex flex-col gap-y-[0.563rem] mt-7">
              <NavItem
                title="Dashboard"
                icon={<AiFillDashboard className="text-xl" />}
                link="/admin"
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Comments"
                icon={<FaComments className="text-xl" />}
                link="/admin/comments"
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItemCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="post"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/posts/manage">Manage All Posts</Link>
                <button
                  disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() =>
                    handleCreatePost({ token: userState.userInfo.token })
                  }
                >
                  Create Post
                </button>
                <Link to="/admin/categories/manage">Categories</Link>
              </NavItemCollapse>

              <NavItem
                title="Users"
                icon={<FaUser className="text-xl" />}
                link="/admin/users/manage"
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
