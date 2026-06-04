import { applyViewInvariantsTo, applyFilters } from "./TicketsReducer.utils"

import { elementsIn, filter, map, merge } from "../../../Types/List.types"

import type { Ticket } from "../Tickets.types"
import type { AddIncomingTickets } from "./Reducer.types"

export const addIncomingTickets: AddIncomingTickets = (state, payload) => {
    const lookup = new Set<Ticket["id"]>()

    const deduped = filter(payload, ticket => {
        if (lookup.has(ticket.id)) return false
        else {
            lookup.add(ticket.id)
            return true
        }
    })

    if (!elementsIn(deduped)) return state

    const { data: existingTickets, view } = state

    const createViewStateWith = applyViewInvariantsTo(state)

    if (!elementsIn(existingTickets)) return createViewStateWith({ tickets: deduped, filteredTickets: deduped })

    const existingIds = new Set(map(existingTickets, ticket => ticket.id))

    const newTickets = filter(deduped, dedup => !existingIds.has(dedup.id))

    const { filteredTickets: existingFilteredTickets } = view

    if (!elementsIn(newTickets))
        return createViewStateWith({ tickets: existingTickets, filteredTickets: existingFilteredTickets })

    const { filters } = view

    const ticketsPassedFilters = filter(newTickets, newTicket => applyFilters(newTicket, filters))

    const updatedTickets = merge(newTickets, existingTickets)

    if (!elementsIn(ticketsPassedFilters))
        return createViewStateWith({ tickets: updatedTickets, filteredTickets: existingFilteredTickets })

    const updatedFilteredTickets = elementsIn(existingFilteredTickets)
        ? merge(ticketsPassedFilters, existingFilteredTickets)
        : ticketsPassedFilters

    return createViewStateWith({ tickets: updatedTickets, filteredTickets: updatedFilteredTickets })
}
