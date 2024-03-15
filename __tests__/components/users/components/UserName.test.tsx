import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserName from "@/components/users/components/UserName";

describe("UserName Component", () => {
  const mockSetUserName = jest.fn();

  // Test for firstName
  describe("when used for first name", () => {
    it("renders first name field correctly", () => {
      render(
        <UserName userName="" setUserName={mockSetUserName} type="firstName" />,
      );
      const firstNameInput = screen.getByRole("textbox", { name: /prénom/i });
      expect(firstNameInput).toBeInTheDocument();
      expect(firstNameInput).toHaveAttribute("type", "text");
    });
  });

  // Test for lastName
  describe("when used for last name", () => {
    it("renders last name field correctly", () => {
      render(
        <UserName userName="" setUserName={mockSetUserName} type="lastName" />,
      );
      const lastNameInput = screen.getByRole("textbox", { name: /nom/i });
      expect(lastNameInput).toBeInTheDocument();
      expect(lastNameInput).toHaveAttribute("type", "text");
    });
  });

  describe("name validation", () => {
    it("shows error for invalid name", () => {
      render(
        <UserName userName="" setUserName={mockSetUserName} type="firstName" />,
      );
      const nameInput = screen.getByRole("textbox");
      fireEvent.change(nameInput, { target: { value: "1" } });
      const helperText = screen.getByText(/Ne doit contenir que des lettres/i);
      expect(helperText).toBeInTheDocument();
    });

    it("accepts valid name", () => {
      render(
        <UserName userName="" setUserName={mockSetUserName} type="lastName" />,
      );
      const nameInput = screen.getByRole("textbox");
      fireEvent.change(nameInput, { target: { value: "Dupont" } });
      expect(mockSetUserName).toHaveBeenCalledWith("Dupont");
    });
  });
});
