import { addIncomingTickets } from "./addIncomingTicket"
import { deleteTickets } from "./deleteTickets"

const { SUBMITTED_TICKET_FORM, CLICKED_DELETE_TICKET } = ticketActions

import { ticketActions, type TicketsActions } from "./Reducer.types"
import type { TicketsState } from "../Tickets.types"

export const ticketsReducer = (state: TicketsState, action: TicketsActions): TicketsState => {
    const { type } = action

    switch (type) {
        case SUBMITTED_TICKET_FORM:
            return addIncomingTickets(state, action.payload)

        case CLICKED_DELETE_TICKET: {
            if (state.mode === "absent") return state
            return deleteTickets(state, action.payload)
        }

        default:
            return state
    }
}
