import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

export function useFetchCabins() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
