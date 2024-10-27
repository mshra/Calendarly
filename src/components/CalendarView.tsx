"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Event } from "@/types/events";

function CalendarView({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month' or 'week'

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = [];

    // Add previous month's days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      daysInMonth.unshift({
        date: prevDate,
        isCurrentMonth: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysInMonth.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - daysInMonth.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      daysInMonth.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return daysInMonth;
  };

  // Get week days
  const getWeekDays = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());

    for (let i = 0; i < 7; i++) {
      week.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === date.getMonth(),
      });
      current.setDate(current.getDate() + 1);
    }

    return week;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Navigation functions
  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousPeriod}
            className="dark:border-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPeriod}
            className="dark:border-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={today}
            className="dark:border-gray-700"
          >
            Today
          </Button>
          <Select value={view} onValueChange={(value) => setView(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-px mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div
          className={`grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden`}
        >
          {(view === "month"
            ? getDaysInMonth(currentDate)
            : getWeekDays(currentDate)
          ).map(({ date, isCurrentMonth }, index) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] ${view === "week" ? "min-h-[200px]" : ""} bg-white dark:bg-gray-800 p-1
                  ${!isCurrentMonth ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-white"}
                  ${isToday ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}
                `}
              >
                <div className="text-right p-1">
                  <span className={`text-sm ${isToday ? "font-bold" : ""}`}>
                    {date.getDate()}
                  </span>
                </div>

                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <TooltipProvider key={event.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 truncate cursor-pointer">
                            {event.time} {event.title}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                            <p className="text-sm">{event.description}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
