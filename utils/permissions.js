import { AUTHORIZED_USERS } from "../data/authorizedUsers.js";

export function isAuthorizedEmail(email = "") {
  return AUTHORIZED_USERS.includes(String(email).toLowerCase().trim());
}
