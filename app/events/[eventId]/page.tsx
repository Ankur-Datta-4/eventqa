"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useDiscussions from "@/lib/hooks/use-discussion";
import useEvent from "@/lib/hooks/use-event";
import { handleDateDefaultValue, handleNiceDate } from "@/lib/utils";
import { ChevronLeftIcon, Share1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function EventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { event, isLoading, isError, mutate } = useEvent(eventId);
  const { threads, isThreadLoading, isThreadError, refetchThreads } =
    useDiscussions(eventId);
  const [userName, setUserName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [title, setTitle] = useState("");

  const handleQuestionSubmit = () => {
    axios
      .post(`/api/v1/events/${eventId}/discussion`, {
        title,
        userName,
        description: questionText,
      })
      .then((res) => {
        toast({
          title: "Question added",
        });
        setQuestionText("");
        setTitle("");
        refetchThreads(eventId);
      });
  };
  if (isLoading || isThreadLoading) {
    return (
      <div className="h-screen w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">Loading..</h1>
        </div>
      </div>
    );
  }
  if (isError || isThreadError) {
    console.log(isError);
    return <div>Some Error Occured</div>;
  }
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col p-8 md:p-12">
        <div className="flex items-center gap-4">
          <Link href={`/events`}>
            <Button variant={"ghost"}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
          </Link>

          <h1 className="text-3xl font-bold my-8">{event?.name}</h1>
        </div>

        <div className="flex gap-4 my-4 items-center">
          <Button>
            <Share1Icon />
          </Button>
          <Button variant={"secondary"}>
            {`At ${handleNiceDate(event?.startTime)}`}
          </Button>
          <Button
            variant={"secondary"}
          >{`Duration ${event?.duration} mins`}</Button>
        </div>
        <h3 className="text-xl font-semibold">About the event</h3>
        <div className="text-gray-500">{event?.description}</div>
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Discussion</h2>
            <Dialog>
              <DialogTrigger>
                <Button>+ Question</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ask a question</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Label>
                    Question title
                    <Input
                      placeholder="question"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Label>
                  <Label>
                    Your Name
                    <Input
                      placeholder="Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Label>
                  <Label>
                    Explain
                    <Textarea
                      placeholder="In detail"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                    />
                  </Label>
                </div>
                <DialogFooter>
                  <Button onClick={handleQuestionSubmit}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6 flex flex-col gap-4 ">
            {threads?.length === 0 && (
              <div className="text-2xl font-light">No discussions yet</div>
            )}
            {threads?.map((item: any, index: any) => (
              <div
                key={`q-${index}`}
                className="p-4 rounded-md flex items-center justify-between bg-slate-100"
              >
                <div className="flex flex-col max-w-7xl">
                  <h2 className="text-xl font-semibold">{item?.title}</h2>
                  <div className="">{item?.description}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <p>{`Asked at ${handleDateDefaultValue(item?.createdAt)}`}</p>
                  <p>{`By ${item?.userName}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
