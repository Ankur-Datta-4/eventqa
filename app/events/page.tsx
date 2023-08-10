"use client";

import useEvents from "@/lib/hooks/use-events";
import { handleDateDefaultValue } from "@/lib/utils";

export default function EventsPage() {
  const { events, isLoading, isError, mutate } = useEvents();
  console.log(events);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(isError);
    return <div>Something unexpected happend</div>;
  }
  return (
    <div className="h-screen w-full">
      <div className="max-w-7xl flex flex-col p-8 md:px-20 gap-8">
        <h1 className="text-3xl font-semibold mb-8">All Events</h1>
        {events.length === 0 && (
          <div className="flex justify-center w-full items-center">
            <p className="text-2xl">No events found</p>
          </div>
        )}
        {events.map((event: any, index: any) => (
          <div
            key={index}
            className="bg-slate-100 w-full flex justify-between p-4 rounded-md "
          >
            <div>
              <h1 className="text-2xl font-bold">{event.name}</h1>
              <p>{event.description}</p>
            </div>

            <div className="flex gap-4">
              <p>{`Identifier: ${event?.slug}`}</p>
              <p>{handleDateDefaultValue(event.startTime)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
