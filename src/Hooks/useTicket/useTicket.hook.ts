import { useReducer } from "react"
import { ticketReducer } from "./ticketReducer"

import type { Ticket } from "../../Types/Ticket.types"
import type { TicketUpdatePayload } from "../../Types/TickerReducer.types"

export const useTicket = (initial: Array<Ticket> = []) => {
  const [tickets, dispatch] = useReducer(ticketReducer, initial)

  const createTicket = (ticket: Ticket) => {
    dispatch({ type: "CREATE", payload: ticket })
  }

  const editTicket = (dataToUpdate: TicketUpdatePayload) => {
    dispatch({ type: "EDIT", payload: dataToUpdate })
  }

  const deleteTicket = (id: Ticket["id"]) => {
    dispatch({ type: "DELETE", payload: id })
  }

  return { tickets, setters: { createTicket, editTicket, deleteTicket } }
}
