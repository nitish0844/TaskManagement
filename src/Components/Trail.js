import React, { useState } from "react";
// import TimezonePicker from "react-timezone-picker";
import moment from "moment-timezone";

const Trail = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");

  // Get list of timezones
  const timezones = moment.tz.names();

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
    console.log("Selected Timezone:", event.target.value);
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
      <p>Selected Timezone: {selectedTimezone || "None"}</p>
    </div>
  );
};

export default Trail;
