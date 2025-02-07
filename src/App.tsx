import { createTheme, MantineProvider } from "@mantine/core";
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
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <SheetsLayout />,
            index: true,
          },
        ],
      },
      {
        path: "/auth",
        element: <Credentials />,
        index: true,
      },
    ],
  },
]);

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
});

function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
