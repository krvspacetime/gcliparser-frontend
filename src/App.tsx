import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { SheetsLayout } from "./components/sheets/SheetsLayout";
import { Notifications } from "@mantine/notifications";
import { Credentials } from "./components/credentials/Credentials";
import { ProtectedRoute } from "./components/credentials/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Credentials />,
        index: true,
      },
      {
        path: "/app",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/app",
            element: <SheetsLayout />,
            index: true,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
