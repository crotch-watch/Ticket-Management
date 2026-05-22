import { callback } from "./TicketsReducer.utils"

import type { TicketsState } from "../Tickets.types"
import type { AddTicketAction } from "./Reducer.types"
import { modes } from "../Tickets.consts"

export const ADD_TICKET = (state: TicketsState, payload: AddTicketAction["payload"]): TicketsState => {
    const incomingTicket = payload

    const {
        data,
        view: { filters, filteredTickets }
    } = state

    const idAlreadyExists = data.list.some(ticket => ticket.id === incomingTicket.id)

    if (idAlreadyExists) return state

    const newTickets = [incomingTicket, ...data.list]

    const incomingTicketPassedFilters = callback(filters, incomingTicket)

    return {
        mode: modes.viewing,
        data: { type: "master", list: newTickets },
        view: {
            ...state.view,
            filteredTickets: {
                type: "filtered",
                list: incomingTicketPassedFilters
                    ? [incomingTicket, ...filteredTickets.list]
                    : [...filteredTickets.list]
            },
            ticketsBeingEdited: { type: "editing", list: [] }
        }
    }
}
