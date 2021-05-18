import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeSwitch from "components/theme-switch";

import DarkModeContext from "contexts/dark-mode";

describe("Theme Switch Component", () => {
  it("renders theme switch label", () => {
    render(<ThemeSwitch />);
    expect(screen.getByLabelText("Dark Mode")).toBeInTheDocument();
  });

  describe("when theme is dark", () => {
    let isDark = true;
    const theme = {
      isDarkMode: isDark,
      setDarkMode: jest.fn().mockImplementation((fn) => {
        isDark = fn(isDark);
        return isDark;
      }),
    };

    beforeAll(() => {
      render(
        <DarkModeContext.Provider value={theme}>
          <ThemeSwitch />
        </DarkModeContext.Provider>,
      );
    });

    describe("when clicking toggle", () => {
      beforeAll(() => userEvent.click(screen.getByRole("checkbox")));

      it("theme callback is ran", () => {
        expect(theme.setDarkMode).toHaveBeenCalled();
      });

      it("theme callback returns opposit of given theme", () => {
        expect(theme.setDarkMode).toHaveReturnedWith(false);
      });
    });
  });
});
