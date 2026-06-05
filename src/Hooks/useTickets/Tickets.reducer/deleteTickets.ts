import { elementsIn, filter } from "../../../Types/List.types"
import type { EditingTickets, Ticket, TicketsState, ViewingTickets } from "../Tickets.types"
import type { DeleteTicketsAction } from "./Reducer.types"

export const INITIAL_TICKETS_STATE = {
    mode: "absent",
    data: [],
    view: {
        filteredTickets: [],
        ticketsBeingEdited: [],
        filters: { searchTerm: "", domain: "All Domains", status: "All Statuses", priority: "All Priorities" },
        selectedTickets: []
    }
} as const

type FilledState = ViewingTickets | EditingTickets
export const deleteTickets = (state: FilledState, payload: DeleteTicketsAction["payload"]): TicketsState => {
    const { data: tickets, view } = state
    const { ticketsBeingEdited } = view

    const uniqueIDs = new Set(payload)
    const removedIds = new Set<Ticket["id"]>()

    const newTickets = filter(tickets, ({ id }) => {
        if (!uniqueIDs.has(id)) return true
        else {
            removedIds.add(id)
            return false
        }
    })

    if (!elementsIn(newTickets)) return INITIAL_TICKETS_STATE

    const newFilteredTickets = filter(tickets, ticket => !removedIds.has(ticket.id))

    if (!elementsIn(ticketsBeingEdited)) {
        return {
            mode: "viewing",
            data: newTickets,
            view: { ...state.view, filteredTickets: newFilteredTickets, ticketsBeingEdited: [] }
        }
    }

    return {
        mode: "editing",
        data: newTickets,
        view: {
            ...state.view,
            ticketsBeingEdited,
            filteredTickets: newFilteredTickets,
            filters: { ...state.view.filters }
        }
    }
}
