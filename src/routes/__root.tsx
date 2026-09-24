import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../routes/styles.css' // assuming there's a global css

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
