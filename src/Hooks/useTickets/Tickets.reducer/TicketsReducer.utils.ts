import type {
  FilteredTickets,
  FilteredTicketsPresent,
  Ticket,
  TicketFilters,
  Tickets,
  TicketsPresent,
  TicketsState,
  ViewingTickets
} from "../Tickets.types"

export function applyFilters(ticket: Ticket, filters: TicketFilters) {
  const { searchTerm, domain, priority, status } = filters

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const hasSearchTerm =
    normalizedSearch === "" ||
    Object.values(ticket).some(value => value != null && value.toString().toLowerCase().includes(normalizedSearch))

  const hasSpecifiedDomain = domain === "All Domains" || ticket.domain === domain

  const hasSpecifiedPriority = priority === "All Priorities" || ticket.priority === priority

  const hasSpecifiedStatus = status === "All Statuses" || ticket.status === status

  return hasSearchTerm && hasSpecifiedDomain && hasSpecifiedPriority && hasSpecifiedStatus
}

export const ticketsArePresent = (tickets: Tickets): tickets is TicketsPresent => tickets.length > 0

export const ticketsAs = <Target extends TicketsPresent | FilteredTicketsPresent>(tickets: Array<Ticket>) =>
  tickets as Target

export const filteredTicketsArePresent = (
  filteredTickets: FilteredTickets
): filteredTickets is FilteredTicketsPresent => filteredTickets.length > 0

export const prepareViewState = (state: TicketsState): Omit<ViewingTickets, "data"> => {
  return {
    ...state,
    mode: "viewing",
    view: { ...state.view, ticketsBeingEdited: [] }
  }
}
