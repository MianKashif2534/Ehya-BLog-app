import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/index/postcategories";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditCategory() {
  const [categoryTitle, setCategoryTitle] = useState("");
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setCategoryTitle(data.title);
    }
  }, [data]);
  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({ title, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category is updated");
        // navigate(`/admin/categories/manage/edit/${data._id}`, {
        //   replace: true,
        // });
        navigate(`/admin/categories/manage`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message);
      },
    });

  const handleHandleCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      token: userState.userInfo.token,
      slug,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-2xl leading-tight mt-2">Update Category</h4>
      <div className="form-control w-full">
        <input
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Category title"
          className="input mt-7 input-bordered border border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
        />
        <button
          disabled={isLoadingUpdateCategory || isLoading || isError}
          type="button"
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleHandleCategory}
        >
          Update Category
        </button>
      </div>
    </div>
  );
}

export default EditCategory;
