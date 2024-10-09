import React from "react";
import { deleteUser, getAllUsers } from "../../../../services/index/users";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTables from "../DataTables";
import { images, stables } from "../../../../constants";

function User() {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: userData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });

  return (
    <DataTables
      pageTitle={"Manage Users"}
      dataListName="Users"
      searchInputPlaceHolder={"User's email..."}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeywordOnSubmitHandler={submitSearchHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "is verified",
        "is Admin",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={userData?.data}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      headers={userData?.headers}
      userState={userState}
    >
      {userData?.data.map((user, index) => (
        <tr key={index}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.sampleUserImage
                    }
                    alt={user.name}
                    className="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap text-center">
              {user.verified ? "✅" : "❌"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap text-center">
              {user.admin ? "✅" : "❌"}
            </p>
          </td>
          <td className="space-x-6 px-5 py-5 text-sm bg-white border-b border-gray-200">
            <button
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={isLoadingDeleteData}
              onClick={() =>
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                })
              }
            >
              Delete
            </button>
          </td>
        </tr>
      ))}{" "}
    </DataTables>
  );
}

export default User;
