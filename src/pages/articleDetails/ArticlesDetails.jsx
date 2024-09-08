import React from "react";
import Mainlayout from "../../components/Mainlayout";
import BreadCrumb from "../../components/BreadCrumb";
import images from "../../constants/images";
import { Link } from "react-router-dom";
import SuggestedPost from "./container/SuggestedPost";
import CommentContainer from "../../components/commentsSection/CommentContainer";
import SocialShareButtons from "../../components/SocialShareButtons";


function ArticlesDetails() {
  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article Title", link: "/blog/1" },
  ];

  const postData = [
    {
      _id: 1,
      title: "Help children get better education",
      createdAt: new Date(),
      image: images.post1image,
    },
    {
      _id: 2,
      title: "Help children get better education",
      createdAt: new Date(),
      image: images.post1image,
    },
    {
      _id: 3,
      title: "Help children get better education",
      createdAt: new Date(),
      image: images.post1image,
    },
    {
      _id: 4,
      title: "Help children get better education",
      createdAt: new Date(),
      image: images.post1image,
    },
  ];

  const tags = [
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education",
  ];

  return (
    <Mainlayout>
      <section className="container mx-auto max-w-5xl flex flex-col p-5 lg:gap-x-5">
        {/* Article and Suggested Posts */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-x-10">
          <article className="flex-1">
            <BreadCrumb data={breadCrumbsData} />
            <img className="w-full rounded-lg" src={images.post} alt="" />
            <Link className="text-primary inline-block font-roboto text-sm mt-5 md:text-lg">
              EDUCATION
            </Link>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-2xl">
              Help children get better education
            </h1>
            <div className="text-dark-soft mt-5">
              <p className="leading-7 md:leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
                congue mauris rhoncus aenean vel elit scelerisque. In egestas
                erat imperdiet sed euismod nisi porta lorem mollis. Morbi
                tristique senectus et netus. Mattis pellentesque id nibh tortor
                10d aliquet lectus proin.
              </p>
            </div>
          </article>
          <div>
            <SuggestedPost
              header="Latest Article"
              post={postData}
              tags={tags}
              className={"mt-10 lg:mt-0 lg:max-w-xs"}
            />
            <div className="mt-5">
              <h2 className="font-roboto text-dark-hard mb-2 font-medium md:text-xl">
                Share on:{" "}
              </h2>
              {/* encodeURI convert invalid characters into utf-8 format */}
              <SocialShareButtons
                url={encodeURI("https://developers.facebook.com/")}
                title={encodeURIComponent(
                  "Client and server side rendering explanation"
                )}
              />
            </div>
          </div>
        </div>
        {/* Comments Section */}
        <CommentContainer className={"mt-10"} loginUserId="a" />
      </section>
    </Mainlayout>
  );
}

export default ArticlesDetails;
