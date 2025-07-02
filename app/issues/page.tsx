import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { prisma } from "@/prisma/client";
import delay from "delay";
import IssuesPage from "./issuecomp";

async function Isssues() {
  await delay(2000);
  const session = await getServerSession(authOptions);
  const issues = await prisma.issue.findMany({
    where: {
      userId: session?.user?.id ?? undefined,
    },
  });
  return <div>
    <IssuesPage issues={issues}/>
  </div>;
}

export default Isssues;
