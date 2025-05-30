import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
interface Props {
  status: Status;
}
function Issueinterface({ status }: Props) {
  if (status === "OPEN") return <Badge color="red">Open</Badge>;
  if (status === "IN_PROGRESS") return <Badge color="violet">In Progress</Badge>;
  if (status === "CLOSED") return <Badge color="green">Closed</Badge>;
}

export default Issueinterface;
