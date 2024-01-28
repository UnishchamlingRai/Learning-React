import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useFetchSetting() {
  const {
    isLoading: isFetching,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isFetching, settings, error };
}
