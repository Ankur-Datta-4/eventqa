import fetcher from "../fetcher";
import useSWR from "swr";

export default function useEvent(eventSlug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/v1/events/${eventSlug}`,
    fetcher
  );

  return {
    event: data?.event || {},
    isLoading,
    isError: error,
    mutate,
  };
}
