import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../App";

describe("Welcome", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("prikaže privzeto ime, če ni uporabnika v localStorage", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/dobrodošli, uporabnik!/i)).toBeInTheDocument();
  });

  it("prikaže ime uporabnika iz localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ username: "TestUser" }));
    render(
      <AuthProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/dobrodošli, testuser!/i)).toBeInTheDocument();
  });

  it("ima gumb za klepet in odjavo", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(
      screen.getByRole("button", { name: /pojdi na klepet/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /odjava/i })).toBeInTheDocument();
  });
});
