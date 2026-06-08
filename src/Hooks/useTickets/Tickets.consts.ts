import type { InitialTicketFilters, NoTicketsPresent } from "./Tickets.types"

export const modes = {
    absent: "absent",
    viewing: "viewing",
    editing: "editing"
} as const

const EMPTY_FILTERS: InitialTicketFilters = {
    searchTerm: "",
    domain: "All Domains",
    status: "All Statuses",
    priority: "All Priorities"
}

Object.freeze(EMPTY_FILTERS)

const TICKETS_ABSENT_VIEW: NoTicketsPresent["view"] = {
    filters: EMPTY_FILTERS,
    filteredTickets: [],
    ticketsBeingEdited: [],
    selectedTickets: []
}

Object.freeze(TICKETS_ABSENT_VIEW)

export const TICKETS_ABSENT: NoTicketsPresent = {
    mode: modes.absent,
    data: [],
    view: TICKETS_ABSENT_VIEW
}

Object.freeze(TICKETS_ABSENT)
