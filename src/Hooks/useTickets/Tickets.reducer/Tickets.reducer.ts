import { addIncomingTickets } from "./addIncomingTicket"

const { SUBMITTED_TICKET_FORM } = ticketActions

import { ticketActions, type TicketsActions } from "./Reducer.types"
import type { TicketsState } from "../Tickets.types"

export const ticketsReducer = (state: TicketsState, action: TicketsActions): TicketsState => {
    const { type } = action

    switch (type) {
        case SUBMITTED_TICKET_FORM:
            return addIncomingTickets(state, action.payload)

        default:
            return state
    }
}
