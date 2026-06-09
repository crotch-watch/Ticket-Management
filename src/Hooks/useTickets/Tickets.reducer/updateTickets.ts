import { elementsIn, map } from "../../../Types/List.types.ts"
import { applyViewInvariantsTo } from "./TicketsReducer.utils.ts"

import type { EditingTickets, ViewingTickets } from "../Tickets.types.ts"
import type { EditTicketAction } from "./Reducer.types.ts"

export const updateTickets = (state: EditingTickets, payload: EditTicketAction["payload"]): ViewingTickets => {
    const requestedChangesMap = new Map(map(payload, change => [change.id, change]))

    const { data: tickets, view } = state
    const { filteredTickets } = view

    const updateTicketIfRequested = (ticket: (typeof tickets)[number]) => {
        const change = requestedChangesMap.get(ticket.id)
        return change ? { ...ticket, ...change } : ticket
    }

    const updatedTickets = map(tickets, updateTicketIfRequested)

    const createViewState = applyViewInvariantsTo(state)

    if (!elementsIn(filteredTickets)) return createViewState({ tickets: updatedTickets, filteredTickets })

    const updatedFilteredTickets = map(filteredTickets, updateTicketIfRequested)

    return createViewState({ tickets: updatedTickets, filteredTickets: updatedFilteredTickets })
}
