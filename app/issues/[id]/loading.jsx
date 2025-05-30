import React from "react";
import { Card, Flex, Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import {Pencil, Trash2Icon, TrashIcon} from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
function LoadingIssueDetails() {
  return (
    <div className="grid sm:grid-rows-2 md:grid-cols-6 p-4 gap-3">
      <div className="col-span-4 flex flex-col gap-y-3">
        <Skeleton></Skeleton>
        <Flex gap="3">
          <Skeleton width={"8rem"} />
          <Skeleton width={"8rem"} />
        </Flex>
        <Card>
          <Skeleton width={"16rem"} height={"5rem"} count={3}></Skeleton>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-y-3">
        <Button variant="outline" color="iris">
          <Pencil className="h-4 w-4 -mr-1" />
          Edit Isssue
        </Button>
        <Button variant="outline" >
          <Trash2Icon className="h-4 w-4 -mr-1" />
          Delete Issue
        </Button>
      </div>
    </div>
  );
}

export default LoadingIssueDetails;
