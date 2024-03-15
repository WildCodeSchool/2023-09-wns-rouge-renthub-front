import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserPassword from "@/components/users/components/UserPassword";

describe("UserPassword Component", () => {
  const mockSetPassword = jest.fn();

  const setup = (password = "") =>
    render(<UserPassword password={password} setPassword={mockSetPassword} />);

  it("should render the password input field", () => {
    setup();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
  });

  it("should toggle password visibility", () => {
    setup();
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("should call onPasswordChange when password is changed", () => {
    setup();
    const newPassword = "NewPassword123!";
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: newPassword },
    });
    expect(mockSetPassword).toHaveBeenCalledWith(newPassword);
  });

  it("should display password criteria", () => {
    setup("Password1!");
    expect(screen.getByText(/9 caractères minimum/i)).toBeInTheDocument();
    expect(screen.getByText(/Un nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Majuscule et minuscule/i)).toBeInTheDocument();
    expect(screen.getByText(/Un caractère spécial/i)).toBeInTheDocument();
  });

  it("should show 4 error icons", () => {
    setup("pass");
    const errorIcons = screen.getAllByTestId("ErrorIcon");
    expect(errorIcons[0].parentNode).toHaveTextContent("9 caractères minimum");
    expect(errorIcons[1].parentNode).toHaveTextContent("Un nombre");
    expect(errorIcons[2].parentNode).toHaveTextContent(
      "Majuscule et minuscule",
    );
    expect(errorIcons[3].parentNode).toHaveTextContent("Un caractère spécial");
  });
  // TODO NOT WORKING DON'T KNOW WHY
  // it('should show 2 check icons', async () => {
  //   setup('ValidPass');
  //   await waitFor(() => {
  //     const errorIcons = screen.getAllByTestId('ErrorIcon');
  //     expect(errorIcons[1].parentNode).toHaveTextContent('Un nombre');
  //     expect(errorIcons[3].parentNode).toHaveTextContent(
  //       'Un caractère spécial'
  //     );
  //     const checkIcons = screen.getAllByTestId('CheckCircleIcon');
  //     expect(checkIcons).toHaveLength(2);
  //     {
  //       timeout: 10000;
  //     }
  //   });
  // });
});
