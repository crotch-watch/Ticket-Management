import { Button } from "../Button/Button"

type CallToActionProps = {
  message?: string
  buttonText?: string
  onAction: () => void
}

export const CallToAction = ({
  message = "No tickets found. Get started by creating one!",
  buttonText = "Create Your First Ticket",
  onAction
}: CallToActionProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
      <p className="text-gray-500">{message}</p>

      <Button onClick={onAction} className="mt-4">
        {buttonText}
      </Button>
    </div>
  )
}
