import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  //For edit Cabin
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createAndEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editCabin };
}
