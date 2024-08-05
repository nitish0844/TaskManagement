import React, { useState } from "react";
import moment from "moment-timezone";

const Trail = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");

  // Get list of timezones
  const timezones = moment.tz.names();

  // Function to get the GMT offset in format GMT ±HH:mm
  const getTimezoneOffset = (timezone) => {
    if (!timezone) return "";
    const offset = moment.tz(timezone).format("Z");
    const sign = offset[0] === "+" ? "GMT +" : "GMT -";
    return `${sign}${offset.slice(1)}`;
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

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
    </div>
  );
};

export default Trail;
