import type {
  Domains,
  Priorities,
  Statuses,
  Ticket,
  TicketFilters
} from "./Ticket.types"

export type TicketUpdatePayload = {
  id: Ticket["id"]
  changes:
    | { status: Ticket["status"] }
    | { priority: Ticket["priority"] }
    | { status: Ticket["status"]; priority: Ticket["priority"] }
}

export type TicketFilterChangePayload =
  | { domain: Domains }
  | { status: Statuses }
  | { priority: Priorities }

export const EMPTY_FILTERS: TicketFilters = {
  search: "",
  domain: "All Domains",
  priority: "All Priorities",
  status: "All Statuses"
} as const

export type TicketActions =
  | {
      type: "CREATE"
      payload: Ticket
    }
  | {
      type: "EDIT"
      payload: TicketUpdatePayload
    }
  | {
      type: "DELETE"
      payload: Ticket["id"]
    }
  | {
      type: "EDIT_FILTERS"
      payload: TicketFilterChangePayload
    }
