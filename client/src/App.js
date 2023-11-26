import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "scenes/Dashboard";
import SignUpPage from "scenes/SignUpPage";
import LoginPage from "scenes/LoginPage";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { createTheme } from "@mui/material/styles";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
