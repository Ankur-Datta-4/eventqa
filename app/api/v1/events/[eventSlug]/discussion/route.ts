import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL DISCUSSIONS WITH COUNT
export async function GET(request: Request, { params }: any) {
  const { eventSlug } = params;
  const event = await prisma.event.findUnique({
    where: {
      slug: eventSlug,
    },
  });
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  const discussions = await prisma.threads.findMany({
    where: {
      event: {
        id: event.id,
      },
      parentId: null,
    },
    include: {
      threads: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    discussions,
  });
}

// ADD QUESTION/REPLY
export async function POST(request: Request, { params }: any) {
  const { eventSlug } = params;
  const event = await prisma.event.findUnique({
    where: {
      slug: eventSlug,
    },
  });
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  const { title, description, parentId, userName } = await request.json();
  let post;
  if (parentId) {
    post = await prisma.threads.create({
      data: {
        title,
        description,
        userName,
        event: {
          connect: {
            id: event.id,
          },
        },
        parentThread: {
          connect: {
            id: parentId,
          },
        },
      },
    });
  } else {
    post = await prisma.threads.create({
      data: {
        title,
        description,
        userName,
        event: {
          connect: {
            id: event.id,
          },
        },
      },
    });
  }

  return NextResponse.json({
    post,
  });
}
