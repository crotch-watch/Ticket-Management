import { useReducer } from "react"
import { ticketReducer } from "./ticketReducer"

import type {
  Ticket,
  TicketFilters,
  TicketState
} from "../../Types/Ticket.types"
import type {
  TicketFilterChangePayload,
  TicketUpdatePayload
} from "../../Types/TickerReducer.types"

export const EMPTY_FILTERS: TicketFilters = {
  search: "",
  domain: "All Domains",
  priority: "All Priorities",
  status: "All Statuses"
} as const

export const INITIAL_TICKET_STATE: TicketState = {
  filters: EMPTY_FILTERS,
  tickets: [],
  filteredTickets: []
} as const

export const useTicket = (initial: TicketState = INITIAL_TICKET_STATE) => {
  const [ticketsState, dispatch] = useReducer(ticketReducer, initial)

  const createTicket = (ticket: Ticket) => {
    dispatch({ type: "CREATE", payload: ticket })
  }

  const editTicket = (dataToUpdate: TicketUpdatePayload) => {
    dispatch({ type: "EDIT", payload: dataToUpdate })
  }

  const deleteTicket = (id: Ticket["id"]) => {
    dispatch({ type: "DELETE", payload: id })
  }

  const editFilters = (filters: TicketFilterChangePayload) => {
    dispatch({ type: "EDIT_FILTERS", payload: filters })
  }

  return {
    ticketsState,
    setters: { createTicket, editTicket, deleteTicket, editFilters }
  }
}
