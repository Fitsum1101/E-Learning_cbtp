import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const usePostMutation = (url, config, dataType) => {
  const queryClient = useQueryClient();

  return useMutation({
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
      console.log("success");
      config.onSuccess();
    },
    onError: (error) => {
      console.log("error", error);
      const errorData = error ? error.response?.data?.errors : {};
      config.onError(errorData);
    },
  });
};

export default usePostMutation;
