import { useEffect } from "react"
import { useNavigate } from "react-router"

import { Button } from "../../Components/Button/Button"
import { FieldGroup } from "../../Components/FieldGroup/FieldGroup.component"
import { Input } from "../../Components/Input/Input.component"
import { Select } from "../../Components/Select/Select.component"
import { Card } from "../../Components/Card/Card.component"

import { useTicketContext } from "../../Hooks/useTicketContext/useTicketContext.hook"

export const TicketForm = () => {
  const {
    state: { formInputs },
    setters: { handleInputChange, handleFormCreation, clearInputs }
  } = useTicketContext()


  useEffect(() => {
    return () => clearInputs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigateTo = useNavigate()

  return (
    <Card className="max-w-xl my-10  mx-auto">
      <form
        className="flex flex-col gap-5 "
        onSubmit={(e) => {
          handleFormCreation(e)
          navigateTo("/")
        }}
      >
        <FieldGroup>
          <label
            htmlFor="form-ticket-title"
            className="text-sm font-medium text-gray-700"
          >
            Title
          </label>

          <Input
            required
            id="form-ticket-title"
            name="title"
            value={formInputs.title}
            onChange={handleInputChange}
          />
        </FieldGroup>

        <FieldGroup>
          <label
            htmlFor="form-ticket-description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <Input
            id="form-ticket-description"
            value={formInputs.description}
            name="description"
            onChange={handleInputChange}
          />
        </FieldGroup>

        <FieldGroup>
          <label
            htmlFor="form-ticket-domain"
            className="text-sm font-medium text-gray-700"
          >
            Domain
          </label>

          <Select
            id="form-ticket-domain"
            name="domain"
            className="w-50"
            value={formInputs.domain}
            onChange={handleInputChange}
          >
            <option value="Engineering">Engineering</option>
            <option value="DevOps">DevOps</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <label
            htmlFor="form-ticket-priority"
            className="text-sm font-medium text-gray-700"
          >
            Priority
          </label>

          <Select
            id="form-ticket-priority"
            name="priority"
            className="w-50"
            value={formInputs.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <label
            htmlFor="form-ticket-status"
            className="text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <Select
            id="form-ticket-status"
            name="status"
            className="w-50"
            value={formInputs.status}
            onChange={handleInputChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Select>
        </FieldGroup>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="warn" onClick={() => navigateTo("/")} type="reset">
            Cancel
          </Button>

          <Button type="submit">Create</Button>
        </div>
      </form>
    </Card>
  )
}
