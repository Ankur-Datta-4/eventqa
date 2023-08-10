import fetcher from "../fetcher";
import useSWR from "swr";

export default function useDiscussions(eventSlug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/v1/events/${eventSlug}/discussion`,
    fetcher
  );
  console.log(data);
  return {
    threads: data?.discussions || [],
    isThreadLoading: isLoading,
    isThreadError: error,
    refetchThreads: mutate,
  };
}
