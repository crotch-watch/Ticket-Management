import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router"

import { TicketForm } from "./Pages/CreateTicket/CreateTicket.page"
import TicketDashboard from "./Pages/Dashboard/Dashboard.page"
import { TicketContextProvider } from "./Context/TicketContext/TicketContext.provider"
import { NotFoundPage } from "./Pages/404/NotFound.page"

const router = createBrowserRouter([
  { path: "/ticket-form", element: <TicketForm /> },
  { path: "/", element: <TicketDashboard /> },
  { path: "*", element: <NotFoundPage /> }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TicketContextProvider>
      <RouterProvider router={router} />
    </TicketContextProvider>
  </StrictMode>
)
