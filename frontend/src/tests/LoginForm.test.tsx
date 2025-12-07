import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from "../components/Login/LoginForm";
import React from "react"; // Eksplicitni import

// Mock za React, če je potrebno
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    // dodatni mocki, če so potrebni
  };
});

describe("LoginForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("prikaže vnosna polja in gumb", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const usernameInput =
      screen.getByPlaceholderText(/uporabniško ime/i) ||
      screen.getByLabelText(/uporabniško ime|username/i);
    const passwordInput =
      screen.getByPlaceholderText(/geslo/i) ||
      screen.getByLabelText(/geslo|password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("omogoča oddajo obrazca", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const usernameInput =
      screen.getByPlaceholderText(/uporabniško ime/i) ||
      screen.getByLabelText(/uporabniško ime|username/i);
    const passwordInput =
      screen.getByPlaceholderText(/geslo/i) ||
      screen.getByLabelText(/geslo|password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });
    fireEvent.click(screen.getByRole("button"));

    expect(mockOnSubmit).toHaveBeenCalledWith("testuser", "testpass");
  });
});
