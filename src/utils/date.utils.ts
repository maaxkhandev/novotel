import { Timestamp } from "firebase/firestore";

const DateUtility = {
  /**
   * Format a Firebase Timestamp or JavaScript Date into "Mon, Jan 6 2020" format.
   * @param dateOrTimestamp - JavaScript Date or Firebase Timestamp.
   * @returns Formatted date string or "Invalid Date" if the input is invalid.
   */
  formatReadableDate: (dateOrTimestamp: Date | Timestamp): string => {
    let date: Date;
console.log(`DATE: ${dateOrTimestamp}`);
    // Validate and convert input
    if (dateOrTimestamp instanceof Timestamp) {
      date = dateOrTimestamp.toDate();
    } else if (dateOrTimestamp instanceof Date) {
      date = dateOrTimestamp;
    } else {
      console.warn("Invalid input: Expected Date or Firebase Timestamp", dateOrTimestamp);
      return "Invalid Date"; // Fallback for invalid inputs
    }

    // Format the date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options).replace(",", "");
  },
};

export default DateUtility;
