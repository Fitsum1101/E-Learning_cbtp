import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const useCustomQuery = (queryKey, url, searchParams = {}) => {
  const searchParamsExists = Object.keys(searchParams).length > 0;
  const { data, isLoading, error, isError } = useQuery({
    queryKey: searchParamsExists ? [queryKey, searchParams] : [queryKey],
    queryFn: ({ queryKey }) => {
      console.log({ queryKey });
      if (searchParamsExists) {
        const queryString = new URLSearchParams(queryKey[1]).toString();
        url += `?${queryString}`;
      }
      return api.get(url);
    },
    select: (response) => {
      console.log(response?.data.data);
      if (response?.data) {
        return response?.data?.data;
      }
      return [];
    },
    staleTime: 10 * 60 * 1000, // 5 minutes
  });

  return { data, isLoading, error, isError };
};
export default useCustomQuery;
