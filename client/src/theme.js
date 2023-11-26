// mui theme settings
export const themeSettings = (mode) => {
  console.log(mode);
  // color themes settings
  const colorSettings = {
    "light-1": {
      // Add your colors here

      paletteMode: "light",
      primary: "#33291F",
      secondary: "#fff",
      neutral: "#666666",
      background: "#FBF2C0",
    },
    "light-2": {
      // Add your colors here
      paletteMode: "light",
      primary: "#2A6563",
      secondary: "#fff",
      neutral: "#666666",
      background: "#F8F7FF",
    },
    "light-3": {
      // Add your colors here
      paletteMode: "light",
      primary: "#41393E",
      secondary: "#fff",
      neutral: "#666666",
      background: "#E9D8DC",
    },
    "dark-1": {
      // Add your colors here
      paletteMode: "dark",
      primary: "#FFFFEB",
      secondary: "#000000",
      neutral: "#9AD2CB",
      background: "#363457",
    },
    "dark-2": {
      // Add your colors here
      paletteMode: "dark",
      primary: "#F5F1E3",
      secondary: "#000000",
      neutral: "#9AD2CB",
      background: "#34252F",
    },
    "dark-3": {
      // Add your colors here
      paletteMode: "dark",
      primary: "#E0E0CE",
      secondary: "#000000",
      neutral: "#9AD2CB",
      background: "#000000",
    },
  };

  return {
    palette: {
      mode: colorSettings[mode].paletteMode,
      primary: {
        main: colorSettings[mode].primary,
      },
      secondary: {
        main: colorSettings[mode].secondary,
      },
      neutral: {
        main: colorSettings[mode].neutral,
      },
      background: {
        default: colorSettings[mode].background,
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
