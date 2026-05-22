import type { modes } from "./Tickets.consts"

export type Domains = "Engineering" | "DevOps" | "HR" | "IT" | "Finance"
export type Statuses = "Open" | "In Progress" | "Closed"
export type Priorities = "Low" | "Medium" | "High" | "Critical"

export type Ticket = {
    id: string
    title: string
    description: string
    domain: Domains
    priority: Priorities
    status: Statuses
    createdAt: Date
}

type Tickets = { type: "master"; list: Array<Ticket> }
type NoTickets = { type: "master"; list: readonly [] }

export type FilteredTicketsPresent = { type: "filtered"; list: Array<Ticket> }
export type FilteredTicketsAbsent = { type: "filtered"; list: readonly [] }
export type FilteredTickets = FilteredTicketsAbsent | FilteredTicketsPresent

export type TicketFilters = {
    searchTerm: string
    domain: Ticket["domain"] | "All Domains"
    priority: Ticket["priority"] | "All Priorities"
    status: Ticket["status"] | "All Statuses"
}

type InitialTicketFilters = {
    searchTerm: ""
    domain: "All Domains"
    priority: "All Priorities"
    status: "All Statuses"
}

export type Modes = (typeof modes)[keyof typeof modes]

type TicketsBeingEdited = { type: "editing"; list: Array<Ticket["id"]> }
type NoTicketsBeingEdited = { type: "editing"; list: readonly [] }

type SelectedTickets = { type: "selected"; list: Array<Ticket["id"]> }
type NoSelectedTickets = { type: "selected"; list: readonly [] }

type NoTicketsPresent = {
    mode: "absent"
    data: NoTickets
    view: {
        filters: InitialTicketFilters
        filteredTickets: FilteredTicketsAbsent
        ticketsBeingEdited: NoTicketsBeingEdited
        selectedTickets: NoSelectedTickets
    }
}

type ViewingTickets = {
    mode: "viewing"
    data: Tickets
    view: {
        filters: TicketFilters
        filteredTickets: FilteredTickets
        ticketsBeingEdited: NoTicketsBeingEdited
        selectedTickets: NoSelectedTickets | SelectedTickets
    }
}

type EditingTickets = {
    mode: "editing"
    data: Tickets
    view: {
        filters: TicketFilters
        filteredTickets: FilteredTickets
        ticketsBeingEdited: TicketsBeingEdited
        selectedTickets: NoSelectedTickets | SelectedTickets
    }
}

export type TicketsState = NoTicketsPresent | ViewingTickets | EditingTickets
