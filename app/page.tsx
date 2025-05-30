import IssueChart from "@/components/ui/IssueChart";
import IssueSummary from "@/components/ui/IssueSummary";
import LatestIssues from "@/components/ui/LatestIssues";
import authOptions from "@/lib/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please sign in to view your issues</h1>
        <p className="text-lg">You need to be signed in to access this page.</p>
      </div>
    );
  }
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
      userId: session?.user?.id ?? undefined,
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
      userId: session?.user?.id ?? undefined,
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
      userId: session?.user?.id ?? undefined,
    },
  });
  return (
    <div className=" flex-col flex justify-start items-start p-4">
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />

      <div className="flex justify-center items-center mb-8 w-11/12">
        <LatestIssues />
      </div>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
}
