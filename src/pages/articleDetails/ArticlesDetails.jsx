import React, { useEffect, useState } from "react";
import Mainlayout from "../../components/Mainlayout";
import BreadCrumb from "../../components/BreadCrumb";
import images from "../../constants/images";
import { Link, useParams } from "react-router-dom";
import SuggestedPost from "./container/SuggestedPost";
import CommentContainer from "../../components/commentsSection/CommentContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useQuery } from "@tanstack/react-query";
import { getallPosts, getSinglePost } from "../../services/index/posts.js";
import stables from "../../constants/stables.js";
import ArticleDetailSkeleton from "./container/commponents/ArticleDetailSkeleton.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { useSelector } from "react-redux";
import parseJsonToHtml from "../../utis/parseJsonToHtml.js";
import Editor from "../../components/editor/Editor.jsx";

// function ArticlesDetails() {
//   const [breadCrumbsData, setBreadCrumbsData] = useState([
//     { name: "Home", link: "/" },
//     { name: "Blog", link: "/blog" },
//     { name: "Article Title", link: "/blog/" },
//   ]);

//   const { slug } = useParams();
//   const [body, setbody] = useState(null)
//   // console.log(slug);
//   const { data, isError, isLoading  } = useQuery({
//     queryKey: ["blog", slug],
//     queryFn: () => getSinglePost({ slug }),
//     onSuccess: (data) => {
//       try {
//         // console.log("Post data inside onSuccess:", data);
//         setBreadCrumbsData([
//           { name: "Home", link: "/" },
//           { name: "Blog", link: "/blog" },
//           { name: "Article title", link: `/blog/${data.slug}` },
//         ]);
//         setbody(parseJsonToHtml(data?.body));
//         // setBreadCrumbsData([
//         //   { name: "Home", link: "/" },
//         //   { name: "Blog", link: "/blog" },
//         //   { name: data.title, link: `/blog/${data.slug}` },
//         // ]);

//       } catch (error) {
//         console.error("Error inside onSuccess:", error);
//       }
//       setbody(parseJsonToHtml(data?.body))
//     }
//     ,
//     onError: (error) => {
//       console.error("Error fetching post:", error.message);
//     },

//   });
//   // console.log("Query Status:", { isLoading, isError, isSuccess, data });
//   const { data  : postData } = useQuery({
//     queryKey: ["Post"],
//     queryFn: () => getallPosts(),
//     onError: (error) => {
//       console.error("Error fetching post:", error.message);
//     },
//   });

//   const userState = useSelector((state) => state.user);

//   // if (isLoading) return <ArticleDetailSkeleton/>;
//   // if (isError) return <div>Error fetching data</div>;
//   // if (isSuccess) return <div>Data fetched successfully</div>;

//   // Additional logging to confirm query status

//   return (
//     <Mainlayout>
//       {isLoading ? (
//         <ArticleDetailSkeleton />
//       ) : isError ? (
//         <ErrorMessage message="Couldn't fetch Post details" />
//       ) : (
//         <section className="container mx-auto max-w-5xl flex flex-col p-5 lg:gap-x-5">
//           {/* Article and Suggested Posts */}
//           <div className="flex flex-col lg:flex-row lg:items-start gap-x-10">
//             <article className="flex-1">
//               <BreadCrumb data={breadCrumbsData} />
//               <img
//                 className="w-full rounded-lg"
//                 // src={
//                 //   data?.photo
//                 //     ? stables.UPLOAD_FOLDER_BASE_URL | data?.photo
//                 //     : images.samplePostImage
//                 // }
//                 src={
//                   data?.photo
//                     ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
//                     : images.samplePostImage
//                 }
//                 alt={data?.title}
//               />
//               <div className="mt-5 flex gap-2">
//                 {data?.categories.map((category) => {
//                   return <Link
//                     to={`/blog?category${category.name}`}
//                     className="text-primary inline-block font-roboto text-sm  md:text-lg"
//                   >
//                     {category.name}
//                   </Link>;
//                 })}
//               </div>

//               <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-2xl">
//                 {data.title}
//               </h1>
//               <div className="text-dark-soft mt-5">
//                 <p className="leading-7 md:leading-8">{data?.body}</p>
//               </div>
//             </article>
//             <div>
//               <SuggestedPost
//                 header="Latest Article"
//                 post={postData?.data}
//                 tags={data?.tags}
//                 className={"mt-10 lg:mt-0 lg:max-w-xs"}
//               />
//               <div className="mt-5">
//                 <h2 className="font-roboto text-dark-hard mb-2 font-medium md:text-xl">
//                   Share on:{" "}
//                 </h2>
//                 {/* encodeURI convert invalid characters into utf-8 format */}
//                 <SocialShareButtons
//                   url={encodeURI(window.location.href)}
//                   title={encodeURIComponent(
//                     data?.title
//                   )}
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Comments Section */}
//           <CommentContainer
//             className={"mt-10"}
//             loginUserId={userState?.userInfo?._id}
//             comments={data?.comments}
//             postslug  = {slug}
//           />
//         </section>
//       )}
//     </Mainlayout>
//   );
// }

// export default ArticlesDetails;
// ArticlesDetails.jsx

function ArticlesDetails() {
  const [breadCrumbsData, setBreadCrumbsData] = useState([
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article Title", link: "/blog/" },
  ]);

  const { slug } = useParams();
  const [body, setBody] = useState(null); // Initialize the state for the post body

  const { data, isError, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSinglePost({ slug }),
    onSuccess: (data) => {
      try {
        // Update breadcrumbs with the post's title
        setBreadCrumbsData([
          { name: "Home", link: "/" },
          { name: "Blog", link: "/blog" },
          { name: data?.title, link: `/blog/${data?.slug}` },
        ]);

        // Parse body content if needed
        // setBody(parseJsonToHtml(data?.body));
        setBody(parseJsonToHtml(data?.body)); // Assuming this converts JSON to valid HTML
      } catch (error) {
        console.error("Error inside onSuccess:", error);
      }
    },
    onError: (error) => {
      console.error("Error fetching post:", error.message);
    },
  });

  const { data: postData } = useQuery({
    queryKey: ["Post"],
    queryFn: () => getallPosts(),
    onError: (error) => {
      console.error("Error fetching post:", error.message);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const userState = useSelector((state) => state.user);

  return (
    <Mainlayout>
      {isLoading ? (
        <ArticleDetailSkeleton /> // Loading state
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch Post details" /> // Error state
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col p-5 lg:gap-x-5">
          {/* Article and Suggested Posts */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-x-10">
            <article className="flex-1">
              <BreadCrumb data={breadCrumbsData} />
              <img
                className="w-full rounded-lg"
                src={
                  data?.photo
                    ? `${stables.UPLOAD_FOLDER_BASE_URL}${data?.photo}`
                    : images.samplePostImage
                }
                alt="postImage"
              />

              <div className="mt-5 flex gap-2">
                {/* Rendering categories as links */}
                {data?.categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/blog?category=${category.name}`}
                    className="text-primary inline-block font-roboto text-sm md:text-lg"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-2xl">
                {data.title}
              </h1>
              <div className="w-full">
            {!isLoading && !isError && (
              <Editor
                content={data.body}
                editable={false}
                onDataChange={(data) => {
                  setBody(data);
                }}
              />
            )}
          </div>
            </article>

            <div>
              <SuggestedPost
                header="Latest Article"
                post={postData?.data}
                tags={data?.tags}
                className={"mt-10 lg:mt-0 lg:max-w-xs"}
              />
              <div className="mt-5">
                <h2 className="font-roboto text-dark-hard mb-2 font-medium md:text-xl">
                  Share on:
                </h2>
                {/* Social media share buttons */}
                <SocialShareButtons
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(data?.title)}
                />
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <CommentContainer
            className={"mt-10"}
            loginUserId={userState?.userInfo?._id}
            comments={data?.comments}
            postslug={slug}
          />
        </section>
      )}
    </Mainlayout>
  );
}

export default ArticlesDetails;
