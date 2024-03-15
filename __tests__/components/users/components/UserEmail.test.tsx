import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserEmail from "@/components/users/components/UserEmail";

describe("UserEmail", () => {
  const setEmailMock = jest.fn();

  const setup = (email = "") =>
    render(<UserEmail email={email} setEmail={setEmailMock} />);

  it("correct base render", () => {
    setup();
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveValue("");
  });

  it("correct render with email value", () => {
    setup("test@super.com");
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    expect(emailInput).toHaveValue("test@super.com");
  });

  it("call setEmail when the value change", () => {
    setup();
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    fireEvent.change(emailInput, { target: { value: "tropcool@tiptop.com" } });
    expect(setEmailMock).toHaveBeenCalledWith("tropcool@tiptop.com");
  });

  it("shows an error message for invalid email", () => {
    setup();
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    expect(
      screen.getByText("Doit être une adresse email valide"),
    ).toBeInTheDocument();
  });

  it("does not show an error message for valid email", () => {
    setup();
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    fireEvent.change(emailInput, { target: { value: "valid@valid.com" } });
    expect(
      screen.queryByText("Doit être une adresse email valide"),
    ).not.toBeInTheDocument();
  });
});
