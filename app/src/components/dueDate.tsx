import { formatDateString } from "@/utils/date.util";
import React from "react";

type Props = {
  dueDate: string;
};

const DueDate: React.FC<Props> = ({ dueDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(dueDate);

  // Check if the deadline is today or in the past
  // If it is past, set style (text in red)
  const isPastDue = deadline < today;
  const style = isPastDue ? { color: "red", fontWeight: "bold" } : {};

  return (
    <time dateTime={dueDate} style={style}>
      {formatDateString(new Date(dueDate), "yyyy/MM/dd")}
    </time>
  );
};

export default DueDate;
