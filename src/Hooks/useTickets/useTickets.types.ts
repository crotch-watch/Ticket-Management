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

type Tickets = Array<Ticket>
type FilteredTickets = Array<Ticket>

type TicketFilters = {
  searchTerm: string
  domain: Ticket["domain"] | "All Domains"
  priority: Ticket["priority"] | "All Priorities"
  status: Ticket["status"] | "All Statuses"
}

type Mode = "editing" | "viewing"
type TicketsBeingEdited = Array<Ticket["id"]>

type Ticketstate = {
  mode: Mode
  data: Tickets
  view: {
    filters: TicketFilters
    filteredTickets: FilteredTickets
    ticketsBeingEdited: TicketsBeingEdited
  }
}
