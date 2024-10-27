"use client";

import CalendarView from "@/components/CalendarView";
import Navbar from "@/components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";

function ViewCalendar() {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Navbar />
      <CalendarView
        events={[
          {
            id: 1,
            title: "Team Meeting",
            date: "2024-10-28",
            time: "10:00",
            description: "Weekly sync with development team.",
          },
          {
            id: 2,
            title: "Client Call",
            date: "2024-10-28",
            time: "14:30",
            description: "Project review with client",
          },
        ]}
      />
    </>
  );
}

export default ViewCalendar;
