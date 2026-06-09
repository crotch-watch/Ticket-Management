import { addIncomingTickets } from "./addIncomingTicket"
import { deleteTickets } from "./deleteTickets"
import { updateTickets } from "./editTickets"

import { modes } from "../Tickets.consts"

import { ticketActions, type TicketsActions } from "./Reducer.types"
import type { TicketsState } from "../Tickets.types"

const { SUBMITTED_TICKET_FORM, CLICKED_DELETE_TICKET, CLICKED_SAVE_DETAILS } = ticketActions
const { editing } = modes

export const ticketsReducer = (state: TicketsState, action: TicketsActions): TicketsState => {
    const { type } = action

    switch (type) {
        case SUBMITTED_TICKET_FORM:
            return addIncomingTickets(state, action.payload)

        case CLICKED_DELETE_TICKET: {
            if (state.mode === "absent") return state
            return deleteTickets(state, action.payload)
        }

        case CLICKED_SAVE_DETAILS: {
            if (state.mode === editing) return updateTickets(state, action.payload)
            else return state
        }

        default:
            return state
    }
}
