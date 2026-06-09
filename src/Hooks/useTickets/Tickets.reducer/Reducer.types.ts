import type { NonEmptyList } from "../../../Types/List.types"
import type {
    EditingTickets,
    Priorities,
    Statuses,
    Ticket,
    TicketFilters,
    TicketsState,
    ViewingTickets
} from "../Tickets.types"
import type { ticketsReducer } from "./Tickets.reducer"

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
    CLICKED_SAVE_DETAILS: "[Dashboard Table Row] Save Button Clicked",
    CLICKED_DELETE_TICKET: "[Dashboard Table Row] Delete Button Clicked"
} as const

export type AddTicketAction = {
    type: typeof ticketActions.SUBMITTED_TICKET_FORM
    payload: NonEmptyList<Ticket>
}

export type EditTicketAction = {
    type: typeof ticketActions.CLICKED_SAVE_DETAILS
    payload: EditTicketPayload
}

export type DeleteTicketsAction = {
    type: typeof ticketActions.CLICKED_DELETE_TICKET
    payload: NonEmptyList<Ticket["id"]>
}

export type TicketsActions =
    | AddTicketAction
    | EditTicketAction
    | DeleteTicketsAction
    | {
          type: "EDIT_FILTER"
          payload: EditFilterPayload
      }

export type AddIncomingTickets = (
    state: TicketsState,
    payload: AddTicketAction["payload"]
) => ReturnType<typeof ticketsReducer>

export type ApplyViewInvariantsTo = (
    state: TicketsState
) => (args: {
    tickets: ViewingTickets["data"]
    filteredTickets: ViewingTickets["view"]["filteredTickets"]
    selectedTickets?: ViewingTickets["view"]["selectedTickets"]
}) => ViewingTickets

export type ApplyEditingInvariantsTo = (
    state: TicketsState
) => (args: {
    ticketsBeingEdited: EditingTickets["view"]["ticketsBeingEdited"]
    tickets: EditingTickets["data"]
    filteredTickets?: EditingTickets["view"]["filteredTickets"]
    selectedTickets?: EditingTickets["view"]["selectedTickets"]
}) => EditingTickets
