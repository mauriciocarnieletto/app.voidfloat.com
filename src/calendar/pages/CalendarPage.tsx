import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import locale from "@fullcalendar/core/locales/pt-br";
import useStyles from "./styles";

export function CalendarPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        locale={locale}
        initialView='dayGridMonth'
      />
    </div>
  );
}
