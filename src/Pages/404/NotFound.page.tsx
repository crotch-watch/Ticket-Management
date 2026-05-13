import { useNavigate } from "react-router"
import { Button } from "../../Components/Button/Button"
import { Card } from "../../Components/Card/Card.component"

export const NotFoundPage = () => {
  const navigateTo = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <Card className="w-full max-w-md">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          Error 404
        </p>

        <h1 className="mt-3 text-5xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => navigateTo("/")}>
            Go Home
          </Button>

          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Card>
    </div>
  )
}
