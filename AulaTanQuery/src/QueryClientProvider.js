import {
  QueryClient,
  QueryClientProvider as TanstackProvider,
} from "@tanstack/react-query";

//Cria uma instancia do QueryClient(controla o cach, refetch, etc)
const queryClient = new QueryClient();

export default function QueryClientProvider({ children }) {
  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
}
