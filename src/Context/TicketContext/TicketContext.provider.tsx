import React, { useEffect, useState } from "react"

import { context } from "./TicketContext"

import { useTicket } from "../../Hooks/useTicket/useTicket.hook"
import {
  useTicketForm,
  type OnChangeEvent
} from "../../Hooks/useTicketForm/useTicketForm.hook"

import type { TicketInputs } from "../../Pages/CreateTicket/CreateTicket.types"
import type { Ticket } from "../../Types/Ticket.types"
import type {
  TicketFilterChangePayload,
  TicketUpdatePayload
} from "../../Types/TickerReducer.types"

export const TicketContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {
    ticketsState,
    setters: { createTicket, editTicket, deleteTicket, editFilters }
  } = useTicket()

  const updateFilters = (event: OnChangeEvent) => {
    const { name, value } = event.target
    editFilters({ [name]: value } as TicketFilterChangePayload)
  }

  const { inputs, updateFormOnChange, addInputs, clearInputs } = useTicketForm()

  const handleFormCreation = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    createTicket({
      id: Math.random().toString(),
      createdAt: new Date(),
      ...inputs
    })

    clearInputs()
  }

  const handleInputChange = (event: OnChangeEvent) => {
    const name = event.target.name as keyof TicketInputs
    updateFormOnChange({ event, name })
  }

  const [editingId, setEditingId] = useState<Ticket["id"]>("")
  const addEditingId = (id: Ticket["id"]) => setEditingId(id)
  const clearEditingId = () => setEditingId("")

  const [mode, setMode] = useState<"viewing" | "editing">("viewing")

  const exitEditingMode = () => {
    setMode("viewing")
    setEditingId("")
  }

  const enterEditingMode = (id: Ticket["id"]) => {
    setMode("editing")
    setEditingId(id)

    const selectedTicket = ticketsState.tickets.find(
      (ticket) => ticket.id === id
    )

    if (selectedTicket) {
      addInputs({
        domain: selectedTicket.domain,
        title: selectedTicket.title,
        description: selectedTicket.description,
        status: selectedTicket.status,
        priority: selectedTicket.priority
      })
    }
  }
  const enterViewingMode = () => setMode("viewing")

  const saveTicketChanges = ({ id, changes }: TicketUpdatePayload) => {
    editTicket({ id, changes })
    clearInputs()
    enterViewingMode()
    clearEditingId()
  }

  return (
    <context.Provider
      value={{
        state: {
          ticketsState: ticketsState,
          formInputs: inputs,
          mode,
          editingId
        },
        setters: {
          editTicket,
          deleteTicket,
          handleFormCreation,
          handleInputChange,
          enterEditingMode,
          saveTicketChanges,
          addEditingId,
          updateFilters,
          exitEditingMode,
          clearInputs
        }
      }}
    >
      {children}
    </context.Provider>
  )
}
