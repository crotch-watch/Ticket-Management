import { elementsIn, filter } from "../../../Types/List.types"

import { applyViewInvariantsTo } from "./TicketsReducer.utils"

import { TICKETS_ABSENT, modes } from "../Tickets.consts"

import type { EditingTickets, NoTicketsPresent, TicketsState } from "../Tickets.types"
import type { DeleteTicketsAction } from "./Reducer.types"

const { viewing, editing } = modes

export const deleteTickets = (
    state: Exclude<TicketsState, NoTicketsPresent>,
    payload: DeleteTicketsAction["payload"]
) => {
    const { data: tickets, view } = state
    const { filteredTickets, selectedTickets } = view

    const uniqueIDs = new Set(payload)

    const updatedTickets = filter(tickets, ticket => !uniqueIDs.has(ticket.id))

    const updatedFilteredTickets = elementsIn(filteredTickets)
        ? filter(filteredTickets, ticket => !uniqueIDs.has(ticket.id))
        : ([] as const)

    const updatedSelections = elementsIn(selectedTickets)
        ? filter(selectedTickets, selection => !uniqueIDs.has(selection))
        : ([] as const)

    if (!elementsIn(updatedTickets)) return TICKETS_ABSENT

    switch (state.mode) {
        case viewing: {
            return applyViewInvariantsTo(state)({
                tickets: updatedTickets,
                filteredTickets: updatedFilteredTickets,
                selectedTickets: updatedSelections
            })
        }

        case editing: {
            const updatedLiveEdits = filter(state.view.ticketsBeingEdited, ticketID => !uniqueIDs.has(ticketID))

            if (!elementsIn(updatedFilteredTickets) || !elementsIn(updatedLiveEdits)) {
                const createState = applyViewInvariantsTo(state)

                return createState({
                    tickets: updatedTickets,
                    filteredTickets: updatedFilteredTickets,
                    selectedTickets: updatedSelections
                })
            }

            const editingState: EditingTickets = {
                mode: editing,
                data: updatedTickets,
                view: {
                    ...state.view,
                    filteredTickets: updatedFilteredTickets,
                    ticketsBeingEdited: updatedLiveEdits,
                    selectedTickets: updatedSelections
                }
            }

            return editingState
        }

        default: {
            const _exhaustiveCheck: never = state
            return _exhaustiveCheck
        }
    }
}
