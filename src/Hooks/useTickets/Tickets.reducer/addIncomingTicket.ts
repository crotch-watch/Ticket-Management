import { applyViewInvariantsTo, applyFilters, deduplicateTickets } from "./TicketsReducer.utils"

import { elementsIn, filter, map, merge } from "../../../Types/List.types"

import type { AddIncomingTickets } from "./Reducer.types"

export const addIncomingTickets: AddIncomingTickets = (state, payload) => {
    const deduped = deduplicateTickets(payload)

    const { data: existingTickets, view } = state
    const { filteredTickets: existingFilteredTickets, filters } = view

    const createViewStateWith = applyViewInvariantsTo(state)

    if (!elementsIn(existingTickets)) return createViewStateWith({ tickets: deduped, filteredTickets: deduped })

    const existingIds = new Set(map(existingTickets, ticket => ticket.id))
    const uniqueTickets = filter(deduped, ticket => !existingIds.has(ticket.id))

    if (!elementsIn(uniqueTickets)) return state

    const uniquesPassedFilters = filter(uniqueTickets, ticket => applyFilters(ticket, filters))
    const prependedTickets = merge(uniqueTickets, existingTickets)

    if (!elementsIn(uniquesPassedFilters)) {
        return createViewStateWith({ tickets: prependedTickets, filteredTickets: existingFilteredTickets })
    }

    const updatedFilteredTickets = elementsIn(existingFilteredTickets)
        ? merge(uniquesPassedFilters, existingFilteredTickets)
        : uniquesPassedFilters

    return createViewStateWith({ tickets: prependedTickets, filteredTickets: updatedFilteredTickets })
}
