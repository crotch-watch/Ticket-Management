import { filter } from "../../../Types/List.types"
import { applyEditingInvariantsTo, applyFilters, applyViewInvariantsTo } from "./TicketsReducer.utils"

import { modes } from "../Tickets.consts"

import type { UpdateFiltersAction } from "./Reducer.types"
import type { FilledState } from "../Tickets.types"

const { viewing, editing } = modes

export const updateFilters = (state: FilledState, payload: UpdateFiltersAction["payload"]): FilledState => {
    const { mode, data: tickets, view } = state
    const { filters } = view

    const updatedFilters = { ...filters, ...payload }
    const updatedFilteredTickets = filter(tickets, ticket => applyFilters(ticket, updatedFilters))

    const baseUpdates = { tickets, filters: updatedFilters, filteredTickets: updatedFilteredTickets }

    switch (mode) {
        case viewing:
            return applyViewInvariantsTo(state)(baseUpdates)

        case editing:
            return applyEditingInvariantsTo(state)({ ...baseUpdates, ticketsBeingEdited: view.ticketsBeingEdited })

        default: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _exhaustiveCheck: never = mode
            return state
        }
    }
}
