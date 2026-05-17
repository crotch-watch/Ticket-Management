import type { TicketActions } from "../../Types/TickerReducer.types"
import type {
  Ticket,
  TicketFilters,
  TicketState
} from "../../Types/Ticket.types"

export const ticketReducer = (
  state: TicketState,
  action: TicketActions
): TicketState => {
  const { type } = action

  switch (type) {
    case "CREATE": {
      const alreadyExists = state.tickets.some(
        (ticket) => ticket.id === action.payload.id
      )

      if (alreadyExists) return state

      const newTicket = action.payload
      const { filters, tickets } = state
      const newTickets = [newTicket, ...tickets]

      return {
        ...state,
        tickets: newTickets,
        filteredTickets: newTickets.filter((ticket) =>
          callback(filters, ticket)
        )
      }
    }

    case "EDIT": {
      const { payload } = action
      const { tickets, filters } = state

      const updatedTickets = tickets.map((ticket) =>
        payload.id === ticket.id ? { ...ticket, ...payload.changes } : ticket
      )

      return {
        ...state,
        tickets: updatedTickets,
        filteredTickets: updatedTickets.filter((ticket) =>
          callback(filters, ticket)
        )
      }
    }

    case "DELETE": {
      const { payload: removeId } = action
      const { tickets, filteredTickets } = state

      return {
        ...state,
        tickets: tickets.filter((ticket) => ticket.id !== removeId),
        filteredTickets: filteredTickets.filter(
          (ticket) => ticket.id !== removeId
        )
      }
    }

    case "EDIT_FILTERS": {
      const { payload: newFilters } = action
      const { tickets, filters } = state

      return {
        ...state,
        filters: { ...filters, ...newFilters },
        filteredTickets: tickets.filter((ticket) =>
          callback({ ...filters, ...newFilters }, ticket)
        )
      }
    }

    default:
      return state
  }
}

function callback(filters: TicketFilters, ticket: Ticket) {
  const { search, domain, priority, status } = filters

  const normalizedSearch = search.trim().toLowerCase()

  const hasSearchTerm =
    normalizedSearch === "" ||
    Object.values(ticket).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(normalizedSearch)
    )

  const hasSpecifiedDomain =
    domain === "All Domains" || ticket.domain === domain
  const hasSpecifiedPriority =
    priority === "All Priorities" || ticket.priority === priority
  const hasSpecifiedStatus =
    status === "All Statuses" || ticket.status === status

  return (
    hasSearchTerm &&
    hasSpecifiedDomain &&
    hasSpecifiedPriority &&
    hasSpecifiedStatus
  )
}
