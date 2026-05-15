export function toDateInputValue(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateInputValue(date);
}

export function getWeekday(dateString = toDateInputValue()) {
  return new Date(`${dateString}T12:00:00`).getDay();
}

export function formatDateHuman(dateString) {
  if (!dateString) return "Sin fecha";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
}

export function getDateRange(startDate, days = 14) {
  return Array.from({ length: days }, (_, index) => addDays(startDate, index));
}

export function getMonthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: toDateInputValue(start),
    end: toDateInputValue(end)
  };
}

export function timestampToDateString(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.toDate) return toDateInputValue(value.toDate());
  return "";
}
