import RoutesApp, { router } from "@/routes/routes";
import { CssBaseline } from "@mui/material";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <main id="app">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </main>
  );
}
