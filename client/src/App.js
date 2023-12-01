import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "scenes/Dashboard";
import Signup from "scenes/SignUp";
import Login from "scenes/Login";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { createTheme } from "@mui/material/styles";
import PasswordReset from "scenes/PasswordReset";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => {
    const themeSetting = themeSettings(mode);
    console.log(themeSetting); // This will log the theme settings for 'light-1'
    return createTheme(themeSetting);
  }, [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
