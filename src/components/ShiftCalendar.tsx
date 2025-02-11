"use client"

import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import type { Employee } from "./EmployeeManagement"

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

interface ShiftCalendarProps {
  employee: Employee
}

export default function ShiftCalendar({ employee }: ShiftCalendarProps) {
  // Function to generate events based on employee availability
  const generateEvents = () => {
    const events = []
    const currentDate = moment().startOf("week").add(4, "days") // Start from Friday

    for (let i = 0; i < 7; i++) {
      const day = currentDate.format("dddd")
      const availability = employee.availability[day]

      if (availability !== "Off") {
        let start, end

        if (availability === "Total") {
          start = currentDate.clone().set({ hour: 9, minute: 0 })
          end = currentDate.clone().set({ hour: 17, minute: 0 })
        } else {
          const [startTime, endTime] = availability.split("-")
          start = currentDate.clone().set({
            hour: Number.parseInt(startTime.split(":")[0]),
            minute: Number.parseInt(startTime.split(":")[1]),
          })
          end = currentDate.clone().set({
            hour: Number.parseInt(endTime.split(":")[0]),
            minute: Number.parseInt(endTime.split(":")[1]),
          })
        }

        events.push({
          title: `Shift: ${availability}`,
          start: start.toDate(),
          end: end.toDate(),
        })
      }

      currentDate.add(1, "day")
    }

    return events
  }

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={generateEvents()}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        min={moment().set({ hour: 7, minute: 0 }).toDate()}
        max={moment().set({ hour: 22, minute: 0 }).toDate()}
      />
    </div>
  )
}

