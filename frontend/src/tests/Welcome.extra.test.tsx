import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../App";

describe("Welcome dodatni testi", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("prikaže email, če username ni v localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ email: "test@email.com" }));
    render(
      <AuthProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(
      screen.getByText(/dobrodošli, test@email.com!/i)
    ).toBeInTheDocument();
  });

  it("prikaže privzeto ime, če je user v localStorage brez username in email", () => {
    localStorage.setItem("user", JSON.stringify({}));
    render(
      <AuthProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/dobrodošli, uporabnik!/i)).toBeInTheDocument();
  });
});
