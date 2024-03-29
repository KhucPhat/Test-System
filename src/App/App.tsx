import RoutesApp from "@/routes/routes";
import { CssBaseline } from "@mui/material";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <main id="app">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RoutesApp />
      </QueryClientProvider>
    </main>
  );
}
