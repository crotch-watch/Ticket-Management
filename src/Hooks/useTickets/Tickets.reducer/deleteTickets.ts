import { elementsIn, filter } from "../../../Types/List.types"

import { applyViewInvariantsTo } from "./TicketsReducer.utils"

import { TICKETS_ABSENT, modes } from "../Tickets.consts"

import type { NoTicketsPresent, TicketsState } from "../Tickets.types"
import type { DeleteTicketsAction } from "./Reducer.types"

const { viewing, editing } = modes

export const deleteTickets = (
    state: Exclude<TicketsState, NoTicketsPresent>,
    payload: DeleteTicketsAction["payload"]
): TicketsState => {
    const { data: tickets, view } = state
    const { filteredTickets, selectedTickets } = view

    const uniqueIDs = new Set(payload)

    const updatedTickets = filter(tickets, ticket => !uniqueIDs.has(ticket.id))
    const updatedFilteredTickets = filter(filteredTickets, ticket => !uniqueIDs.has(ticket.id))
    const updatedSelections = filter(selectedTickets, selection => !uniqueIDs.has(selection))

    if (!elementsIn(updatedTickets)) return TICKETS_ABSENT

    const createViewState = applyViewInvariantsTo(state)

    const updates = {
        tickets: updatedTickets,
        filteredTickets: updatedFilteredTickets,
        selectedTickets: updatedSelections
    }

    switch (state.mode) {
        case viewing:
            return createViewState(updates)

        case editing: {
            const updatedLiveEdits = filter(state.view.ticketsBeingEdited, ticketID => !uniqueIDs.has(ticketID))

            if (elementsIn(updatedFilteredTickets) && elementsIn(updatedLiveEdits))
                return {
                    mode: editing,
                    data: updatedTickets,
                    view: {
                        ...state.view,
                        filteredTickets: updatedFilteredTickets,
                        ticketsBeingEdited: updatedLiveEdits,
                        selectedTickets: updatedSelections
                    }
                }
            else return createViewState(updates)
        }

        default: {
            const _exhaustiveCheck: never = state
            return _exhaustiveCheck
        }
    }
}
