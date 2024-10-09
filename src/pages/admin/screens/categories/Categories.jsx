import React, { useState } from "react";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createCategory,
  deleteCategory,
  getallCategories,
} from "../../../../services/index/postcategories";
import DataTables from "../../components/DataTables";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Categories() {
  const [categoryTitle, setCategoryTitle] = useState("");


  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ title, token }) => {
        return createCategory({ title, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category is Created");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message);
      },
    });

  const handleCreateCategory = () => {
    mutateCreateCategory({
      title: categoryTitle,
      token: userState.userInfo.token,
    });
  };

  const {
    userState,
    currentPage,
    searchKeyword,
    data: categoriesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getallCategories(searchKeyword, currentPage),
    dataQueryKey: "categories",
    deleteDataMessage: "Category is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteCategory({
        slug,
        token,
      });
    },
  });

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-xl leading-tight mt-2 ">Add new Category</h4>
        <div className="form-control w-full">
          <input
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder="Category title"
            className="input mt-7 input-bordered border border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          />
          <button
            disabled={isLoadingCreateCategory}
            type="button"
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleCreateCategory}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <DataTables
          pageTitle={""}
          dataListName="Categories"
          searchInputPlaceHolder={"Category title..."}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeywordOnSubmitHandler={submitSearchHandler}
          searchKeyword={searchKeyword}
          tableHeaderTitleList={["Title", "Created At", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={categoriesData?.data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          headers={categoriesData?.headers}
          userState={userState}
        >
          {categoriesData?.data.map((category, index) => (
            <tr key={index}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.title}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="space-x-6 px-5 py-5 text-sm bg-white border-b border-gray-200">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={isLoadingDeleteData}
                  onClick={() =>
                    deleteDataHandler({
                      slug: category?._id,
                      token: userState.userInfo.token,
                    })
                  }
                >
                  Delete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${category?._id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}{" "}
        </DataTables>
      </div>
    </div>
  );
}

export default Categories;
