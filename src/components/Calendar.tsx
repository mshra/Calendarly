"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Plus, Edit2, Trash2, Calendar, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { DialogHeader } from "./ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/types/events";
import { useUser } from "@auth0/nextjs-auth0/client";

function CalendarApp() {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, error, isLoading } = useUser();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setSelectedEvent((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
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

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEdit = (event) => {
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
                  type="text"
                  name="title"
                  value={isEditMode ? selectedEvent?.title : newEvent.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={isEditMode ? selectedEvent?.date : newEvent.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  name="time"
                  value={isEditMode ? selectedEvent?.time : newEvent.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  value={
                    isEditMode
                      ? selectedEvent?.description
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
                <div className="flex items-center gap-2 ">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 ">
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
