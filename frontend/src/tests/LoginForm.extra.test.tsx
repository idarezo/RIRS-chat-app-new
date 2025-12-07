import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from "../components/Login/LoginForm";

describe("LoginForm dodatni testi", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("prikaže napako, če je podan error prop", () => {
    render(<LoginForm onSubmit={mockOnSubmit} error="Napačni podatki" />);
    expect(screen.getByText(/napačni podatki/i)).toBeInTheDocument();
  });
});
