import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import RegisterForm from "../components/Register/RegisterForm";

describe("RegisterForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("prikaže vsa vnosna polja in gumb", () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/uporabniško ime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priimek/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-pošta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^geslo$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/potrdi geslo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registriraj se/i })
    ).toBeInTheDocument();
  });

  it("omogoča oddajo pravilno izpolnjenega obrazca", () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText(/uporabniško ime/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/priimek/i), {
      target: { value: "TestPriimek" },
    });
    fireEvent.change(screen.getByLabelText(/e-pošta/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^geslo$/i), {
      target: { value: "geslo123" },
    });
    fireEvent.change(screen.getByLabelText(/potrdi geslo/i), {
      target: { value: "geslo123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /registriraj se/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "testuser",
      lastName: "TestPriimek",
      email: "test@example.com",
      password: "geslo123",
    });
  });

  it("ne odda obrazca, če se gesli ne ujemata", () => {
    window.alert = vi.fn();
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText(/uporabniško ime/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/priimek/i), {
      target: { value: "TestPriimek" },
    });
    fireEvent.change(screen.getByLabelText(/e-pošta/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^geslo$/i), {
      target: { value: "geslo123" },
    });
    fireEvent.change(screen.getByLabelText(/potrdi geslo/i), {
      target: { value: "drugoGeslo" },
    });
    fireEvent.click(screen.getByRole("button", { name: /registriraj se/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Gesli se ne ujemata!");
  });
});
