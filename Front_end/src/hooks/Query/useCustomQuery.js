import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const useCustomQuery = (queryKey, url, searchParams = {}) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [queryKey, searchParams],
    queryFn: ({ queryKey }) => {
      if (Object.keys(queryKey[1]).length > 0) {
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
  });

  return { data, isLoading, error, isError };
};
export default useCustomQuery;
