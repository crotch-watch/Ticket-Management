import { applyFilters } from "./TicketsReducer.utils"

import { elementsIn, filter, map, merge } from "../../../Types/List.types"

import type { Ticket, TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"

export const addIncomingTickets = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
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

    if (!elementsIn(existingTickets))
        return {
            mode: "viewing",
            data: deduped,
            view: { ...view, filteredTickets: deduped, ticketsBeingEdited: [] }
        }

    const existingIds = new Set(map(existingTickets, ticket => ticket.id))

    const newTickets = filter(deduped, dedup => !existingIds.has(dedup.id))

    const { filteredTickets: existingFilteredTickets } = view

    if (!elementsIn(newTickets))
        return {
            ...state,
            mode: "viewing",
            data: existingTickets,
            view: {
                ...view,
                ticketsBeingEdited: []
            }
        }

    const { filters } = view

    const ticketsPassedFilters = filter(newTickets, newticket => applyFilters(newticket, filters))

    const updatedTickets = merge(newTickets, existingTickets)

    if (!elementsIn(ticketsPassedFilters))
        return {
            ...state,
            mode: "viewing",
            data: updatedTickets,
            view: { ...view, ticketsBeingEdited: [] }
        }

    const updatedFilteredTickets = elementsIn(existingFilteredTickets)
        ? merge(ticketsPassedFilters, existingFilteredTickets)
        : ticketsPassedFilters

    return {
        ...state,
        mode: "viewing",
        data: updatedTickets,
        view: {
            ...view,
            filteredTickets: updatedFilteredTickets,
            ticketsBeingEdited: []
        }
    }
}
