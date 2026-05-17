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
  search: string
  domain: Domains | "All Domains"
  priority: Priorities | "All Priorities"
  status: Statuses | "All Statuses"
}

export type TicketState = {
  filters: TicketFilters
  filteredTickets: Array<Ticket>
  tickets: Array<Ticket>
}

