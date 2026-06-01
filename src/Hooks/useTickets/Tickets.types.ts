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

type EmptyList = readonly []

export type TicketsPresent = Array<Ticket> & { _brand: "main" }
export type Tickets = EmptyList | TicketsPresent

export type FilteredTicketsPresent = Array<Ticket> & { _brand: "filtered" }
export type FilteredTickets = EmptyList | FilteredTicketsPresent

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

type TicketsBeingEdited = Array<Ticket["id"]> & { _brand: "editing" }

type SelectedTickets = Array<Ticket["id"]> & { _brand: "selected" }

type NoTicketsPresent = {
    mode: "absent"
    data: EmptyList
    view: {
        filters: InitialTicketFilters
        filteredTickets: EmptyList
        ticketsBeingEdited: EmptyList
        selectedTickets: EmptyList
    }
}

export type ViewingTickets = {
    mode: "viewing"
    data: TicketsPresent
    view: {
        filters: TicketFilters
        filteredTickets: FilteredTickets
        ticketsBeingEdited: EmptyList
        selectedTickets: EmptyList | SelectedTickets
    }
}

type EditingTickets = {
    mode: "editing"
    data: TicketsPresent
    view: {
        filters: TicketFilters
        filteredTickets: FilteredTickets
        ticketsBeingEdited: TicketsBeingEdited
        selectedTickets: EmptyList | SelectedTickets
    }
}

export type TicketsState = NoTicketsPresent | ViewingTickets | EditingTickets
