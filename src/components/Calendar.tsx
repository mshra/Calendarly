"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Plus, Edit2, Trash2, Calendar, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { DialogHeader } from "./ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@auth0/nextjs-auth0/client";
import { EventFormData, Event } from "@/types/events";
import { useRouter } from "next/navigation";

function CalendarApp(): JSX.Element {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, error, isLoading } = useUser();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<EventFormData>({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const router = useRouter();

  // Move the events initialization to useEffect
  useEffect(() => {
    if (user) {
      setEvents([
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
      ]);
    }
  }, [user]); // Only run when user changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    if (isEditMode && selectedEvent) {
      setSelectedEvent((prev) => (prev ? { ...prev, [name]: value } : null));
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isEditMode && selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event,
        ),
      );
      setIsEditMode(false);
    } else {
      const newId = Math.max(...events.map((event) => event.id), 0) + 1;
      setEvents([...events, { ...newEvent, id: newId }]);
    }
    setNewEvent({ title: "", date: "", time: "", description: "" });
    setSelectedEvent(null);
  };

  const handleDelete = (id: number): void => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEdit = (event: Event): void => {
    setSelectedEvent(event);
    setIsEditMode(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <Button onClick={() => router.push("/calendar")}>
            View in Calendar
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={
                    isEditMode && selectedEvent
                      ? selectedEvent.title
                      : newEvent.title
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={
                    isEditMode && selectedEvent
                      ? selectedEvent.date
                      : newEvent.date
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  name="time"
                  value={
                    isEditMode && selectedEvent
                      ? selectedEvent.time
                      : newEvent.time
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={
                    isEditMode && selectedEvent
                      ? selectedEvent.description
                      : newEvent.description
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                {isEditMode ? "Update Event" : "Create Event"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{event.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <p>{event.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CalendarApp;
