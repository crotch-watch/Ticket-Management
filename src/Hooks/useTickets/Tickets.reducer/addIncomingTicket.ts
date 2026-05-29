import { applyFilters, brand, filteredTicketsArePresent, ticketsArePresent } from "./TicketsReducer.utils"

import type { FilteredTicketsPresent, Ticket, TicketsPresent, TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"

export const addIncomingTicket = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
  const incomingTicket = payload

  const { data, view } = state
  const { filters, filteredTickets } = view

  if (!ticketsArePresent(data)) {
    return {
      ...state,
      mode: "viewing",
      data: brand<Array<Ticket>, TicketsPresent>([incomingTicket]),
      view: { ...state.view, ticketsBeingEdited: [] }
    }
  } else {
    const idAlreadyExists = data.some(ticket => ticket.id === incomingTicket.id)
    if (idAlreadyExists) return state

    const passedFilters = applyFilters(incomingTicket, filters)

    if (!passedFilters) {
      return {
        ...state,
        mode: "viewing",
        data: brand<Array<Ticket>, TicketsPresent>([incomingTicket, ...data]),
        view: {
          ...state.view,
          ticketsBeingEdited: []
        }
      }
    }

    const updatedFilteredTickets = filteredTicketsArePresent(filteredTickets)
      ? [incomingTicket, ...filteredTickets]
      : [incomingTicket]

    return {
      ...state,
      mode: "viewing",
      data: brand<Array<Ticket>, TicketsPresent>([incomingTicket, ...data]),
      view: {
        ...state.view,
        ticketsBeingEdited: [],
        filteredTickets: brand<Array<Ticket>, FilteredTicketsPresent>(updatedFilteredTickets)
      }
    }
  }
}
