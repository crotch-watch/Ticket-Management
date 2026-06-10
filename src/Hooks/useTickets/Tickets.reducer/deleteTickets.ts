import { elementsIn, filter } from "../../../Types/List.types"

import { applyEditingInvariantsTo, applyViewInvariantsTo } from "./TicketsReducer.utils"

import { TICKETS_ABSENT, modes } from "../Tickets.consts"

import type { FilledState, TicketsState } from "../Tickets.types"
import type { DeleteTicketsAction } from "./Reducer.types"

const { viewing, editing } = modes

export const deleteTickets = (state: FilledState, payload: DeleteTicketsAction["payload"]): TicketsState => {
    const { data: tickets, view } = state
    const { filteredTickets, selectedTickets, ticketsBeingEdited } = view

    const uniqueIDs = new Set(payload)

    const updatedTickets = filter(tickets, ticket => !uniqueIDs.has(ticket.id))

    if (!elementsIn(updatedTickets)) return TICKETS_ABSENT

    const updatedFilteredTickets = filter(filteredTickets, ticket => !uniqueIDs.has(ticket.id))
    const updatedSelections = filter(selectedTickets, selection => !uniqueIDs.has(selection))

    const createViewState = applyViewInvariantsTo(state)

    const baseUpdates = {
        tickets: updatedTickets,
        filteredTickets: updatedFilteredTickets,
        selectedTickets: updatedSelections
    }

    const updatedViewingState = createViewState(baseUpdates)

    switch (state.mode) {
        case viewing:
            return updatedViewingState

        case editing: {
            const updatedLiveEdits = filter(ticketsBeingEdited, ticketID => !uniqueIDs.has(ticketID))

            if (!elementsIn(updatedLiveEdits)) return updatedViewingState

            const createEditingState = applyEditingInvariantsTo(state)

            return createEditingState({
                ...baseUpdates,
                ticketsBeingEdited: updatedLiveEdits
            })
        }

        default: {
            const _exhaustiveCheck: never = state
            return _exhaustiveCheck
        }
    }
}
