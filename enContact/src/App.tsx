import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <Home />
            </ThemeProvider>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
