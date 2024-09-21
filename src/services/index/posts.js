import axios from "axios";

// getallPosts
export const getallPosts = async (searchKeyword="", page = 1 , pageSize = 10) => {
  try {
    const { data , headers } = await axios.get(`/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${pageSize}`);
    return { data , headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
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


export const deletePost = async ({ slug  , token}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/posts/${slug}`,config);
    // console.log("Axios response data:", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
