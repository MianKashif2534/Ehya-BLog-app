//useDataTable
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

let firstTimeRender = true;

export const useDataTable = ({
  dataQueryFn,
  dataQueryKey,
  mutateDeleteFn,
  deleteDataMessage,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [dataQueryKey],
    queryFn: dataQueryFn,
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeleteData } =
    useMutation({
      //   queryKey: ["profile"],
      mutationFn: mutateDeleteFn,
      onSuccess: (data) => {
        queryClient.invalidateQueries([dataQueryKey]);
        toast.success(deleteDataMessage);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (firstTimeRender) {
      firstTimeRender = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const deleteDataHandler = ({ slug, token }) => {
    if (window.confirm("Do you want to delete this record?")) {
      mutateDeletePost({ slug, token });
    }
  };
  const submitSearchHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };
  return {
    userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  };
};
