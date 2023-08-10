import fetcher from "../fetcher";
import useSWR from "swr";

export default function useEvents() {
  const { data, error, isLoading, mutate } = useSWR(`/api/v1/events`, fetcher);

  return {
    events: data?.events || [],
    isLoading,
    isError: error,
    mutate,
  };
}
