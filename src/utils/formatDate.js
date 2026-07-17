export function getDay(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
  });
}