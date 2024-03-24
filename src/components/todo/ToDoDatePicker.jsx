import {
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useMemo, useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const NOW = dayjs();

const generateNumbers = (startDate) => {
  const numbers = [];
  // Adjusted to display 28 days starting from startDate
  for (let i = 0; i < 28; i++) {
    const date = startDate.add(i, "day");
    const isPast = date.isBefore(dayjs(), "day");
    const title = isPast ? null : date.date();
    const fullDate = date.format("DD.MM.YYYY");
    // Only show dates that are not in the past or null if they are
    numbers.push({
      title,
      key: i,
      value: isPast ? null : fullDate,
      month: date.format("MMM"),
    });
  }
  return numbers;
};
export default function ToDoDatePicker() {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(NOW.startOf("week"));
  const dayNumbers = useMemo(
    () => generateNumbers(currentMonth),
    [currentMonth]
  );

  const [reminder, setReminder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <CalendarMonthIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>When?</DialogTitle>
          <Grid container spacing={2} columns={7}>
            <Grid item xs={7}>
              {currentMonth.format("MMMM YYYY")}
            </Grid>
            {DAYS.map((day) => (
              <Grid item key={day} xs={1}>
                {day}
              </Grid>
            ))}
            {dayNumbers.map(({ key, title, value, month }) => (
              <Grid item key={key} xs={1}>
                <IconButton
                  disabled={!title}
                  onClick={() => {
                    console.log(value);
                  }}>
                  {title === 1 ? (
                    <Typography
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ fontSize: "0.8rem", height: "40px" }}>
                      <span>{month}</span>
                      <span>{title}</span>
                    </Typography>
                  ) : (
                    <Typography
                      height="40px"
                      display="flex"
                      alignItems="center">
                      <span>{title}</span>
                    </Typography>
                  )}
                </IconButton>
              </Grid>
            ))}
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  setCurrentMonth(currentMonth.add(21, "day"));
                }}>
                {">"}
              </IconButton>
            </Grid>
          </Grid>
        </ModalDialog>
      </Modal>
    </>
  );
}
