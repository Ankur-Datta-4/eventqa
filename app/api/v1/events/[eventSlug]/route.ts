import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const eventSlug = params.eventSlug;

  const event = await prisma.event.findUnique({
    where: {
      slug: eventSlug,
    },
  });
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({
    event,
  });
}
