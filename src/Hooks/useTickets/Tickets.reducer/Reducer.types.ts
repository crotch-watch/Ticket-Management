import type { Priorities, Statuses, Ticket, TicketFilters } from "../Tickets.types"

type EditTicketPayload = {
    id: Ticket["id"]
    changes: { status: Statuses } | { priorities: Priorities } | { status: Statuses; priority: Priorities }
}

type EditFilterPayload =
    | { status: TicketFilters["status"] }
    | { priority: TicketFilters["priority"] }
    | { domain: TicketFilters["domain"] }

export const ticketActions = {
    SUBMITTED_TICKET_FORM: "[Ticket Form] User Submitted Ticket Details",
    CLICKED_SAVE_DETAILS: "[Dashboard Table Row] Save Button Clicked"
} as const

export type AddTicketAction = {
    type: typeof ticketActions.SUBMITTED_TICKET_FORM
    payload: Array<Ticket>
}

export type EditTicketAction = {
    type: typeof ticketActions.CLICKED_SAVE_DETAILS
    payload: EditTicketPayload
}

export type TicketsActions =
    | AddTicketAction
    | EditTicketAction
    | {
          type: "DELETE_TICKET"
          payload: Ticket["id"]
      }
    | {
          type: "EDIT_FILTER"
          payload: EditFilterPayload
      }
