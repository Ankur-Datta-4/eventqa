"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { handleDateDefaultValue } from "@/lib/utils";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Share1Icon } from "@radix-ui/react-icons";

const eventSchema = z.object({
  name: z.string().min(3, {
    message:
      "Make sure your event is discoverable by making it longer than 3 characters",
  }),
  description: z.string(),
  startTime: z.string(),
  duration: z.string(),
  expireTime: z.date(),
});

export default function EventCreateForm() {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      startTime: handleDateDefaultValue(new Date().toISOString()),
      duration: "60",
      expireTime: new Date(),
    },
  });
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [createdEvent, setCreatedEvent] = useState(null);
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    setLoading(true);
    let startTime = new Date(values.startTime);
    console.log(startTime.toISOString());
    console.log(values);
    const res = await fetch(`/api/v1/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, startTime: startTime.toISOString() }),
    });
    const data = await res.json();
    setCreatedEvent(data?.event);
    console.log(data?.event);
    setShowDialog(true);
    setLoading(false);
    toast({
      title: "Event Created",
    });
    form.reset();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Make it discoverable" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the event</FormLabel>
                <FormControl>
                  <Textarea placeholder="Be a lil descriptive" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration in mins" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="45">45 mins</SelectItem>
                    <SelectItem value="60">60 mins</SelectItem>
                    <SelectItem value="90">90 mins</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Start Time
                  <br />
                </FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <input type="datetime-local" defaultValue={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button disabled={loading}>
              {/* {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} */}
              Create Event
            </Button>
          </div>
        </form>
      </Form>
      {showDialog && createdEvent && (
        <div className="my-4">
          <Dialog>
            <DialogTrigger>
              <Button>
                <Share1Icon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Event Identifier</DialogTitle>
              <div
                className="relative mt-3 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-center text-slate-800"
                onClick={() => {
                  navigator.clipboard.writeText(
                    // @ts-ignore
                    `${window.location.protocol}//${window.location.host}/events/${createdEvent?.slug}`
                  );
                  toast({
                    title: "Copied to Clipboard",
                  });
                }}
              >
                {/* @ts-ignore */}
                <p>{`${window.location.protocol}//${window.location.host}/events/${createdEvent?.slug}`}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
