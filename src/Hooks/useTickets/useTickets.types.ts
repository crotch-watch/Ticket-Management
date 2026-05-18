export type Domains = "Engineering" | "DevOps" | "HR" | "IT" | "Finance"
export type Statuses = "Open" | "In Progress" | "Closed"
export type Priorities = "Low" | "Medium" | "High" | "Critical"

type Ticket = {
  id: string
  title: string
  description: string
  domain: Domains
  priority: Priorities
  status: Statuses
  createdAt: Date
}

type Tickets = { type: "master"; list: Array<Ticket> }
type FilteredTickets = { type: "filtered"; list: Array<Ticket> }

type TicketFilters = {
  searchTerm: string
  domain: Ticket["domain"] | "All Domains"
  priority: Ticket["priority"] | "All Priorities"
  status: Ticket["status"] | "All Statuses"
}

type Mode = "editing" | "viewing"

type TicketsBeingEdited = { type: "editing"; list: Array<Ticket["id"]> }
type SelectedTickets = { type: "selected"; list: Array<Ticket["id"]> }

export type TicketsState = {
  mode: Mode
  data: Tickets
  view: {
    filters: TicketFilters
    filteredTickets: FilteredTickets
    ticketsBeingEdited: TicketsBeingEdited
    selectedTickets: SelectedTickets
  }
}
