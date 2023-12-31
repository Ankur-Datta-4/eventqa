"use client";

import { Button } from "@/components/ui/button";
import useEvents from "@/lib/hooks/use-events";
import { handleDateDefaultValue } from "@/lib/utils";
import Link from "next/link";

export default function EventsPage() {
  const { events, isLoading, isError, mutate } = useEvents();
  console.log(events);
  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">Loading..</h1>
        </div>
      </div>
    );
  }
  if (isError) {
    console.log(isError);
    return <div>Something unexpected happend</div>;
  }
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col p-8 md:px-20 gap-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-8">All Events</h1>
          <Link href={`/events/create`} passHref>
            <Button>+ Event</Button>
          </Link>
        </div>
        {events.length === 0 && (
          <div className="flex justify-center w-full items-center">
            <p className="text-2xl">No events found</p>
          </div>
        )}
        {events.map((event: any, index: any) => (
          <Link key={index} href={`/events/${event?.slug}`}>
            <div className="bg-slate-100 w-full flex justify-between p-4 rounded-md ">
              <div>
                <h1 className="text-2xl font-bold">{event.name}</h1>
                <p>{event.description}</p>
              </div>

              <div className="flex gap-4">
                <p>{`Identifier: ${event?.slug}`}</p>
                <p>{handleDateDefaultValue(event.startTime)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
