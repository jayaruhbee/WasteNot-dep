import LandingPage from "./pages/LandingPage";
import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Stack height="100%" sx={{ backgroundColor: "#0a1214" }}>
      {path !== "/" && <Navbar />}
      <Outlet />
    </Stack>
  );
}

export default App;
