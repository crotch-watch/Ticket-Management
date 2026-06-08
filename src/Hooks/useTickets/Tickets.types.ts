import type { EmptyList, List, NonEmptyList } from "../../Types/List.types"
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

export type TicketFilters = {
    searchTerm: string
    domain: Ticket["domain"] | "All Domains"
    priority: Ticket["priority"] | "All Priorities"
    status: Ticket["status"] | "All Statuses"
}

export type InitialTicketFilters = {
    searchTerm: ""
    domain: "All Domains"
    priority: "All Priorities"
    status: "All Statuses"
}

export type Modes = (typeof modes)[keyof typeof modes]

type SelectedTickets = List<Ticket["id"]>

export type NoTicketsPresent = {
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
    data: NonEmptyList<Ticket>
    view: {
        filters: TicketFilters
        filteredTickets: List<Ticket>
        ticketsBeingEdited: EmptyList
        selectedTickets: SelectedTickets
    }
}

export type EditingTickets = {
    mode: "editing"
    data: NonEmptyList<Ticket>
    view: {
        filters: TicketFilters
        filteredTickets: NonEmptyList<Ticket>
        ticketsBeingEdited: NonEmptyList<Ticket["id"]>
        selectedTickets: SelectedTickets
    }
}

export type TicketsState = NoTicketsPresent | ViewingTickets | EditingTickets
