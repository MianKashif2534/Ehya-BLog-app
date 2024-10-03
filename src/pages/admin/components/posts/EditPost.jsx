// Editpost
import React, { useEffect, useState } from "react";
import ArticleDetailSkeleton from "../../../articleDetails/container/commponents/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, UpdatePost } from "../../../../services/index/posts";
import { useParams, Link, useNavigate, replace } from "react-router-dom";
import { useSelector } from "react-redux";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../dropdownSelect/MultiSelectTagDropdown";
import { getallCategories } from "../../../../services/index/postcategories";
import CreatableSelect from "react-select/creatable";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utis/multiSelectTagsUtils";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getallCategories();
  return filterCategories(inputValue, categoriesData);
};

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("")

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: () => {
      setInitialPhoto(data?.photo);
      setCategories(data?.categories.map((item) => item._id));
      setTitle(data.title);
      setTags(data.tags);
    },
    refetchOnWindowFocus : false
  });

  const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePost } =
    useMutation({
      mutationFn: ({ updateData, slug, token }) => {
        return UpdatePost({ updateData, slug, token });
      },
      onSuccess: (data) => {
        // console.log("Post updated successfully: ", data);
        queryClient.invalidateQueries(["blog", slug]);
        toast.success("Post is updated");
        navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message);
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Ensure this updates correctly
    }
  };

  useEffect(() => {
    return () => {
      if (photo instanceof File) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo]);

  const handleUpdatePost = async () => {
    let updateData = new FormData();
    if (!initialPhoto && photo) {
      updateData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let responce = await fetch(url);
        let blog = await responce.blob();
        const file = new File([blog], initialPhoto, { type: blog.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      updateData.append("postPicture", picture);
    }
    // console.log("Updated body content:", body);
    updateData.append(
      "document",
      JSON.stringify({ body, categories, title, tags, slug: postSlug , caption})
    );

    mutateUpdatePostDetail({
      updateData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  const isPostDataLoaded = !isLoading && !isError;

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch Post details" />
      ) : (
        <section className="container mx-auto max-w-4xl flex flex-col p-5 lg:gap-x-5 lg:flex-row  lg:items-start">
          {/* Article and Suggested Posts */}
          <article className="flex-1">
            <label htmlFor="postPicture" className="cursor-pointer w-full">
              {photo instanceof File ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : (
                <div className="w-full h-full min-h-[100px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 text-primary h-auto" />
                </div>
              )}
            </label>

            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>
            <div className="mt-5 flex gap-2">
              {data?.categories.map((category) => {
                return (
                  <Link
                    key={category.name}
                    to={`/blog?category=${category.name}`}
                    className="text-primary inline-block font-roboto text-sm  md:text-lg"
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="input input-bordered border border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="caption">
                <span className="label-text">Caption</span>
              </label>
              <input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter caption"
                className="input input-bordered border border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="slug">
                <span className="label-text">Slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="Post slug"
                className="input input-bordered border border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              />
            </div>
            <div className="my-5">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)}
                  onChange={(newValue) => {
                    setCategories(newValue.map((item) => item.value));
                  }}
                />
              )}
            </div>
            <div className="my-5">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data.tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) => {
                    setTags(newValue.map((item) => item.value));
                  }}
                  className="relative z-20"
                />
              )}
            </div>
            <div className="w-full">
              {isPostDataLoaded && (
                <Editor
                  content={data.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePost}
              type="button"
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handleUpdatePost}
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  );
}

export default EditPost;

// chatGpt
// import React, { useEffect, useState } from "react";
// import ArticleDetailSkeleton from "../../../articleDetails/container/commponents/ArticleDetailSkeleton";
// import ErrorMessage from "../../../../components/ErrorMessage";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getSinglePost, UpdatePost } from "../../../../services/index/posts";
// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import parseJsonToHtml from "../../../../utis/parseJsonToHtml";
// import { stables } from "../../../../constants";
// import { HiOutlineCamera } from "react-icons/hi";
// import toast from "react-hot-toast";

// function EditPost() {
//   const { slug } = useParams();
//   const [photo, setPhoto] = useState(null);
//   const [initialPhoto, setInitialPhoto] = useState(null);
//   const [body, setBody] = useState(null);
//   const [photoUrl, setPhotoUrl] = useState("");  // Add state for object URL
//   const userState = useSelector((state) => state.user);
//   const queryClient = useQueryClient();

//   const { isLoading, isError, data } = useQuery({
//     queryFn: () => getSinglePost({ slug }),
//     queryKey: ["blog", slug],
//   });

//   const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePost } =
//     useMutation({
//       mutationFn: ({ updateData, slug, token }) => {
//         return UpdatePost({ updateData, slug, token });
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(["blog", slug]);
//         toast.success("Post is updated");
//       },
//       onError: (error) => {
//         toast.error(error.message);
//         console.log(error.message);
//       },
//     });

//   useEffect(() => {
//     if (!isLoading && !isError) {
//       setPhoto(data?.photo);
//       setBody(parseJsonToHtml(data?.body));
//     }
//   }, [isLoading, isError, data]);

//   // Cleanup URL.createObjectURL
//   // useEffect(() => {
//   //   if (photo && photo instanceof Blob) {
//   //     const objectUrl = URL.createObjectURL(photo);
//   //     setPhotoUrl(objectUrl); // Store the object URL in state

//   //     return () => {
//   //       URL.revokeObjectURL(objectUrl); // Cleanup on component unmount or photo change
//   //     };
//   //   }
//   // }, [photo]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(file);
//   };

//   const handleUpdatePost = async () => {
//     let updateData = new FormData();
//     if (!initialPhoto && photo) {
//       updateData.append("postPicture", photo);
//     } else if (initialPhoto && !photo) {
//       const urlToObject = async (url) => {
//         let response = await fetch(url);
//         let blog = await response.blob();
//         const file = new File([blog], initialPhoto, { type: blog.type });
//         return file;
//       };
//       const picture = await urlToObject(
//         stables.UPLOAD_FOLDER_BASE_URL + data?.photo
//       );
//       updateData.append("postPicture", picture);
//     }
//     updateData.append("document", JSON.stringify({}));

//     for (let pair of updateData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     mutateUpdatePostDetail({
//       updateData,
//       slug,
//       token: userState.userInfo.token,
//     });
//   };

//   const handleDeleteImage = () => {
//     if (window.confirm("Do you want to delete your Post picture?")) {
//       setInitialPhoto(null);
//       setPhoto(null);
//     }
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <ArticleDetailSkeleton />
//       ) : isError ? (
//         <ErrorMessage message="Couldn't fetch Post details" />
//       ) : (
//         <section className="container mx-auto max-w-4xl flex flex-col p-5 lg:gap-x-5 lg:flex-row lg:items-start">
//           <article className="flex-1">
//             <label htmlFor="postPicture" className="cursor-pointer w-full">
//               {photo ? (
//                 <img
//                   src={URL.createObjectURL(photo)}
//                   alt={data.title}
//                   className="rounded-xl w-full"
//                 />
//               ) : initialPhoto ? (
//                 <img
//                   src={stables.UPLOAD_FOLDER_BASE_URL + data.photo}
//                   alt={data?.title}
//                   className="rounded-xl w-full"
//                 />
//               ) : (
//                 <div className="w-full h-full min-h-[100px] bg-blue-50/50 flex justify-center items-center">
//                   <HiOutlineCamera className="w-7 text-primary h-auto" />
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               className="sr-only"
//               id="postPicture"
//               onChange={handleFileChange}
//             />
//             <button
//               type="button"
//               onClick={handleDeleteImage}
//               className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
//             >
//               Delete Image
//             </button>
//             <div className="mt-5 flex gap-2">
//               {data?.categories.map((category) => {
//                 return (
//                   <Link
//                     key={category.name}
//                     to={`/blog?category=${category.name}`}
//                     className="text-primary inline-block font-roboto text-sm  md:text-lg"
//                   >
//                     {category.name}
//                   </Link>
//                 );
//               })}
//             </div>
//             <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-2xl">
//               {data.title}
//             </h1>
//             <div className="mt-4 prose prose-sm sm:prose-base">
//               {body}
//             </div>
//             <button
//               disabled={isLoadingUpdatePost}
//               type="button"
//               className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
//               onClick={handleUpdatePost}
//             >
//               Update Post
//             </button>
//           </article>
//         </section>
//       )}
//     </div>
//   );
// }

// export default EditPost;
