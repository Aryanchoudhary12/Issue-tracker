import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
interface Props {
  status: Status;
}
function Issueinterface({ status }: Props) {
  if (status === "OPEN") return <Badge color="red" size={"3"}>Open</Badge>;
  if (status === "IN_PROGRESS") return <Badge color="violet" size={"3"}>In Progress</Badge>;
  if (status === "CLOSED") return <Badge color="green" size={"3"}>Closed</Badge>;
}

export default Issueinterface;
