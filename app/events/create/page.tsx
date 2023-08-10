"use client";
import { Button } from "@/components/ui/button";
import EventCreateForm from "./EventCreateForm";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="max-w-7xl flex flex-col p-8 md:px-20">
        <div className="flex items-center gap-4">
          <Link href={`/events`}>
            <Button variant={"ghost"}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create Event</h1>
        </div>
        <div className="m-8 max-12">
          <EventCreateForm />
        </div>
      </div>
    </div>
  );
}
