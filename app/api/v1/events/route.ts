import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const events = await prisma.event.findMany();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { name, description, startTime, duration } = data;
  const event = await prisma.event.create({
    data: {
      name,
      description,
      startTime,
      duration: parseInt(duration),
    },
  });

  return NextResponse.json({
    event,
  });
}

export async function DELETE(request: Request, { params }: any) {
  const event = await prisma.event.deleteMany({});

  return NextResponse.json({
    event,
  });
}
