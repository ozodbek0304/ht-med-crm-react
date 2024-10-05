import CalendarView from "./calender-view";
import { useGetCalendarListQuery } from "../../features/calendar/calendar-isAvailable";
import { useCalendarIsAvailableStore } from "../../store/calendarIsAvailableStore";

const CalenderPage = () => {
  const { queryParam } = useCalendarIsAvailableStore();
  const queryStr = new URLSearchParams({
    ...(queryParam as Record<string, string>),
  }).toString();


  const { data,isLoading } = useGetCalendarListQuery(queryStr);

  return (
    <div>
      <CalendarView
        loading={isLoading}
        events={data?.results}
        />
    </div>
  );
};

export default CalenderPage;
