import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const prisma = new PrismaClient();
  const body = await req.json();
  if (body.title == "" || body.description == "")
    return NextResponse.json("Please Provide title or description", {
      status: 400,
    });
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(context.params.id),
    },
  });
  if (!issue) {
    return NextResponse.json("Issue not found", {
      status: 404,
    });
  }
  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue, {
    status: 200,
  });
}
export async function DELETE(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const prisma = new PrismaClient();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(context.params.id),
    },
  });
  if (!issue) {
    return NextResponse.json("Issue not found", {
      status: 404,
    });
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json("Issue deleted successfully", {
    status: 200,
  });
}
