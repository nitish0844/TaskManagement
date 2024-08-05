import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Trail = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Get list of timezones
  const timezones = moment.tz.names();

  // Function to get the GMT offset in format GMT ±HH:mm
  const getTimezoneOffset = (timezone) => {
    if (!timezone) return "";
    const offset = moment.tz(timezone).format("Z");
    const sign = offset[0] === "+" ? "GMT +" : "GMT -";
    return `${sign}${offset.slice(1)}`;
  };

  // Function to update the current date and time
  const updateDateTime = (timezone) => {
    if (timezone) {
      const now = moment.tz(timezone);
      setCurrentDate(now.format("YYYY-MM-DD")); // Format the date
      setCurrentTime(now.format("HH:mm:ss")); // Format the time
    } else {
      setCurrentDate("");
      setCurrentTime("");
    }
  };

  const handleTimezoneChange = (event) => {
    const timezone = event.target.value;
    setSelectedTimezone(timezone);
    updateDateTime(timezone);
  };

  useEffect(() => {
    if (selectedTimezone) {
      updateDateTime(selectedTimezone);
    }
  }, [selectedTimezone]);

  return (
    <div>
      <h1>Select Timezone</h1>
      <select value={selectedTimezone} onChange={handleTimezoneChange}>
        <option value="">Select a timezone</option>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
      <p>
        Selected Timezone:{" "}
        {selectedTimezone ? getTimezoneOffset(selectedTimezone) : "None"}
      </p>
      <p>Current Date: {currentDate || "N/A"}</p>
      <p>Current Time: {currentTime || "N/A"}</p>
    </div>
  );
};

export default Trail;
