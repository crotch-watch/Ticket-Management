import {
    applyFilters,
    ticketsAs,
    filteredTicketsArePresent,
    ticketsArePresent,
    prepareViewState
} from "./TicketsReducer.utils"

import type { FilteredTicketsPresent, Ticket, TicketsPresent, TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"

export const addIncomingTickets = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
    const incomingTicket = payload

    const lookup = new Set<Ticket["id"]>()
    const deduped = incomingTicket.filter(ticket => {
        if (lookup.has(ticket.id)) return false
        else {
            lookup.add(ticket.id)
            return true
        }
    })

    const { data: tickets, view } = state
    const { filters, filteredTickets } = view

    const baseViewState = prepareViewState(state)

    if (!ticketsArePresent(tickets))
        return {
            ...baseViewState,
            data: ticketsAs<TicketsPresent>(deduped),
            view: {
                ...baseViewState.view,
                filteredTickets: ticketsAs<FilteredTicketsPresent>(deduped)
            }
        }

    const existingIds = new Set(tickets.map(ticket => ticket.id))

    const newTickets = deduped.filter(dedup => !existingIds.has(dedup.id))

    if (!newTickets.length) return { ...baseViewState, data: tickets }

    const passedFilters = newTickets.filter(newticket => applyFilters(newticket, filters))

    const updatedTickets = ticketsAs<TicketsPresent>([...newTickets, ...tickets])

    if (!passedFilters.length) return { ...baseViewState, data: updatedTickets }

    const updatedFilteredTickets = ticketsAs<FilteredTicketsPresent>(
        filteredTicketsArePresent(filteredTickets) ? [...passedFilters, ...filteredTickets] : passedFilters
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
