import axios from "axios";

export const getallPosts = async () => {
  try {
    const { data } = await axios.get("/api/posts");
    // console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};


export const getSinglePost = async ({slug}) => {
  try {
    const { data } = await axios.get(`/api/posts/${slug}`);
    // console.log("Axios response data:", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
