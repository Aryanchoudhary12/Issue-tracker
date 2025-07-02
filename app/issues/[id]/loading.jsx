import React from "react";
import { Card, Flex, Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import { Pencil, Trash2Icon, TrashIcon } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
function LoadingIssueDetails() {
  return (
    <div className="flex flex-col p-4 gap-3 mt-4 w-10/12">
      <div className="flex flex-col gap-y-3">
        <Skeleton loading={true}></Skeleton>
        <Flex gap="3" justify={"between"}>
          <Skeleton loading={true} width={"8rem"} />
          <Skeleton loading={true} width={"8rem"} />
        </Flex>
        <hr className="h-0 border-2 rounded-2xl" />

        <Card>
          <Skeleton loading={true} width={"100%"} height={"1rem"} count={3}></Skeleton>
        </Card>
      </div>
      <div className="flex flex-row gap-y-3 mt-4">
        <Button variant="outline" color="iris">
          <Pencil className="h-4 w-4 -mr-1" />
          Edit Isssue
        </Button>
        <Button variant="outline">
          <Trash2Icon className="h-4 w-4 -mr-1" />
          Delete Issue
        </Button>
      </div>
    </div>
  );
}

export default LoadingIssueDetails;
