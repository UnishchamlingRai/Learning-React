import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //for create Cabin
  const { isLoading: isCreating, mutate: createNewCabin } = useMutation({
    mutationFn: (newCabin) => createAndEditCabin(newCabin),
    onSuccess: () => {
      toast.success("Cabin Created Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createNewCabin };
}
