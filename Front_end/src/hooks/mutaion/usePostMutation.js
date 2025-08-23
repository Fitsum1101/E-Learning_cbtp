import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const usePostMutation = (url, config, dataType = "application/json") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [url],
    mutationFn: (data) =>
      api.post(url, data, {
        headers: dataType,
      }),
    onSuccess: (data) => {
      if (config.invalidateQueryKey) {
        queryClient.invalidateQueries({
          queryKey: [config.invalidateQueryKey],
        });
      }
      config.onSuccess(data.response?.data?.data);
    },
    onError: (error) => {
      console.log("error", error);
      const errorData = error ? error.response?.data?.errors : {};
      config.onError(errorData);
    },
  });
};

export default usePostMutation;
