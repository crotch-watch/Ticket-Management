import {
    applyFilters,
    ticketsAs,
    filteredTicketsArePresent,
    ticketsArePresent,
    prepareViewState
} from "./TicketsReducer.utils"

import type { FilteredTicketsPresent, TicketsPresent, TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"

export const addIncomingTicket = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
    const incomingTicket = payload

    const { data: tickets, view } = state
    const { filters, filteredTickets } = view

    const baseViewState = prepareViewState(state)

    if (!ticketsArePresent(tickets)) return { ...baseViewState, data: ticketsAs<TicketsPresent>([incomingTicket]) }

    const idExists = tickets.some(ticket => ticket.id === incomingTicket.id)
    if (idExists) return state

    const passedFilters = applyFilters(incomingTicket, filters)

    const updatedTickets = ticketsAs<TicketsPresent>([incomingTicket, ...tickets])

    if (!passedFilters) return { ...baseViewState, data: updatedTickets }

    const updatedFilteredTickets = ticketsAs<FilteredTicketsPresent>(
        filteredTicketsArePresent(filteredTickets) ? [incomingTicket, ...filteredTickets] : [incomingTicket]
    )

    return {
        ...baseViewState,
        data: updatedTickets,
        view: {
            ...baseViewState.view,
            filteredTickets: updatedFilteredTickets
        }
    }
}
