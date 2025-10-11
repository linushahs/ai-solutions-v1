export function formatEventDate(event_date, end_date) {
  if (!event_date || !end_date) return null;

  const start = new Date(event_date);
  const end = new Date(end_date);

  // Helper to format time as "06:00 AM"
  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // use 'UTC' to match Zulu (Z) times
    });

  return {
    month: start.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
    day: start.getUTCDate().toString().padStart(2, "0"),
    year: start.getUTCFullYear().toString(),
    event_time: `${formatTime(start)} - ${formatTime(end)}`,
  };
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
