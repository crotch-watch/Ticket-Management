import { ADD_TICKET } from "./Tickets.reducer/ADD_TICKET.case"

import type { TicketsActions } from "./Tickets.reducer/Reducer.types"
import type { TicketsState } from "./Tickets.types"

export const ticketsReducer = (state: TicketsState, action: TicketsActions): TicketsState => {
    const { type } = action

    switch (type) {
        case "ADD_TICKET":
            return ADD_TICKET(state, action.payload)

        default:
            return state
    }
}
