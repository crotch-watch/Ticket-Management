import type { Priorities, Statuses, Ticket, TicketFilters } from "../Tickets.types"

type EditTicketPayload = {
    id: Ticket["id"]
    changes: { status: Statuses } | { priorities: Priorities } | { status: Statuses; priority: Priorities }
}

type EditFilterPayload =
    | { status: TicketFilters["status"] }
    | { priority: TicketFilters["priority"] }
    | { domain: TicketFilters["domain"] }

export type AddTicketAction = {
    type: "ADD_TICKET"
    payload: Ticket
}

export type TicketsActions =
    | AddTicketAction
    | {
          type: "EDIT_TICKET"
          payload: EditTicketPayload
      }
    | {
          type: "DELETE_TICKET"
          payload: Ticket["id"]
      }
    | {
          type: "EDIT_FILTER"
          payload: EditFilterPayload
      }
