import { applyFilters } from "./TicketsReducer.utils"

import { modes } from "../Tickets.consts"

import type { FilteredTickets, TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"

export const addIncomingTicket = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
    const incomingTicket = payload

    const {
        data,
        view: { filters, filteredTickets }
    } = state

    const idAlreadyExists = data.list.some(ticket => ticket.id === incomingTicket.id)
    if (idAlreadyExists) return state

    const updatedTickets = [incomingTicket, ...data.list]

    const passedFilters = applyFilters(incomingTicket, filters)
    const updatedFiltersTickets: FilteredTickets = {
        type: "filtered",
        list: passedFilters ? [incomingTicket, ...filteredTickets.list] : [...filteredTickets.list]
    }

    return {
        mode: modes.viewing,
        data: { type: "master", list: updatedTickets },
        view: {
            ...state.view,
            filteredTickets: updatedFiltersTickets,
            ticketsBeingEdited: { type: "editing", list: [] }
        }
    }
}
