"use client";
import { Button } from "@/components/ui/button";
import EventCreateForm from "./EventCreateForm";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="max-w-7xl flex flex-col p-8 md:px-20">
        <h1 className="text-3xl font-bold">Create Event</h1>
        <div className="my-8">
          <EventCreateForm />
        </div>
      </div>
    </div>
  );
}
