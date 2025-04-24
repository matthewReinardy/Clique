import { Suspense } from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationRoutes from "./routes/NavigationRoutes";
import PageLoading from "./components/PageLoading";

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Router>
        <UserProvider>
          <NavigationRoutes />
        </UserProvider>
      </Router>
    </Suspense>
  );
}
