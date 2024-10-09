import axios from "axios";

export const createNewComments = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/comments",
      { desc, slug, parent, replyOnUser },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const UpdateComments = async ({ token, desc, commentId , check}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/comments/${commentId}`,
      { desc , check },
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/comments/${commentId}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getallComments = async (
  token,
  searchKeyword = "",
  page = 1,
  pageSize = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data, headers } = await axios.get(
      `/api/comments?searchKeyword=${searchKeyword}&page=${page}&limit=${pageSize}`,
      config
    );
    // console.log(data);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
