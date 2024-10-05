"use client";
import  { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ExternalDraggingevent from "./dragging-events";
import { Card, CardContent } from "../../components/ui/card";
import { uz } from "date-fns/locale";
import { EventContentArg } from "@fullcalendar/core";
import { DateRange } from "react-day-picker";
import { useCalendarIsAvailableStore } from "../../store/calendarIsAvailableStore";
import dayjs from "dayjs";

import { Skeleton } from "../../components/ui/skeleton";
import { CalendarIsAvailableItem } from "../../interfaces/calendar-list";
import { Calendar } from "../../components/ui/calendar";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
interface CalendarViewProps {
  events: CalendarIsAvailableItem[] | undefined;
  loading: boolean;
}

const CalendarView = ({ events, loading }: CalendarViewProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const { setQueryParam } = useCalendarIsAvailableStore();

  const [dragEvents] = useState([
    { title: "Yangi Tadbir Rejalashtirish", id: "101", tag: "business" },
    { title: "Uchrashuv", id: "102", tag: "meeting" },
    { title: "Hisobotlarni Tayyorlash", id: "103", tag: "holiday" },
    { title: "Yangi Taqdimot Yaratish", id: "104", tag: "etc" },
  ]);

  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let event = dragEvents.find((e) => e.id === id);
            let tag = event ? event.tag : "";
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (dragEvents.length > 0) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [dragEvents]);

  const handleEventClick = (arg: any) => {
    wait().then(() => (document.body.style.pointerEvents = "auto"));
  };

  const handleDateClick = (range: DateRange) => {
    setSelectedRange(range);

    if (range?.from && range?.to) {
      setQueryParam({
        start_date: dayjs(range?.from).format("YYYY-MM-DD"),
        end_date: dayjs(range?.to).format("YYYY-MM-DD"),
      });
    }
  };

  const handleClassName = (arg: EventContentArg) => {
    if (arg.event.extendedProps.calendar === "holiday") {
      return "destructive";
    } else if (arg.event.extendedProps.calendar === "business") {
      return "primary";
    } else if (arg.event.extendedProps.calendar === "personal") {
      return "success";
    } else if (arg.event.extendedProps.calendar === "family") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "etc") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "meeting") {
      return "warning";
    } else {
      return "primary";
    }
  };

  return (
    <>
      <div className=" grid grid-cols-12 gap-6 divide-x  divide-border">
        <Card className="col-span-12 lg:col-span-4 2xl:col-span-3  pb-5">
          <CardContent className="p-0 ">
            <div className="px-3">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={(range: any) => handleDateClick(range)}
                className="rounded-md border w-full p-0 border-none"
              />
            </div>

            <div id="external-events" className=" space-y-1.5 mt-6 px-4">
              <p className=" text-sm font-medium text-default-700 pb-2">
                Tadbirlarni ko'chirib tashlang yoki kalendarda bosing
              </p>
              {events?.map((event) => (
                <ExternalDraggingevent key={event.id} event={event} />
              ))}
            </div>
            {/* <div className="py-4 text-default-800  font-semibold text-xs uppercase mt-4 px-4">
              Filter
            </div>
            <ul className=" space-y-2 px-4">
              <li className=" flex gap-3">
                <Checkbox
                  checked={selectedCategory?.length === categories?.length}
                  onClick={() => {
                    if (selectedCategory?.length === categories?.length) {
                      setSelectedCategory([]);
                    } else {
                      setSelectedCategory(categories.map((c) => c.value));
                    }
                  }}
                />
                <Label>Hammasi</Label>
              </li>
              {categories?.map((category) => (
                <li className=" flex gap-3 " key={category.value}>
                  <Checkbox
                    className={category.className}
                    id={category.label}
                    checked={selectedCategory?.includes(category.value)}
                    onClick={() => handleCategorySelection(category.value)}
                  />
                  <Label htmlFor={category.label}>{category.label}</Label>
                </li>
              ))}
            </ul> */}
          </CardContent>
        </Card>

        {loading ? (
          <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
            <CardContent className="w-full h-full">
              <div className="w-full h-full overflow-hidden rounded-t-md">
                <Skeleton className="w-full h-full  rounded-b-none" />
              </div>

              {/* <div className="p-4 ">
          <Skeleton className="w-1/2 h-4 mb-4" />
          <Skeleton className="w-full h-3 mb-2" />
          <Skeleton className="w-full h-3 mb-2" />
          <Skeleton className="w-full h-3 mb-2" />
          <Skeleton className="w-3/4 h-3 mb-4" />

          <div className=" flex gap-3">
            <Skeleton className="w-28 h-4 mb-1" />
            <Skeleton className="w-28 h-4 mb-1" />
          </div>
        </div> */}
            </CardContent>
          </Card>
        ) : (
          <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
            <CardContent className="dash-tail-calendar">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                events={
                  events?.map((event) => ({
                    id: event.id.toString(),
                    start: event.date,
                    end: "",
                    title: event.title,
                  })) || []
                }
                editable={true}
                rerenderDelay={10}
                eventDurationEditable={false}
                selectable={true}
                selectMirror={true}
                droppable={true}
                dayMaxEvents={2}
                weekends={true}
                eventClassNames={handleClassName}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                locale={uz}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default CalendarView;
