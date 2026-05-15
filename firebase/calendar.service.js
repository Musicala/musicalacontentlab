import { getTasksByRange } from "./contentTasks.service.js";

/**
 * En el MVP el calendario se alimenta de contentTasks.
 * Si luego quieren programaciones editoriales independientes, esta capa ya está lista para crecer.
 */
export async function getCalendarItems(startDate, endDate) {
  return getTasksByRange(startDate, endDate);
}
