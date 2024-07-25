import { gql } from "@apollo/client";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { toast } from "react-hot-toast";
import SignIn from "@/components/users/signin/SignIn";
import { UserProvider } from "@/context/UserContext";
import { mutationUserLogin } from "@/graphql/user/mutationUserLogin";

// Mocks React-Hot-Toast
jest.mock("react-hot-toast");

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock GraphQL requests simulation
const ME_CONTEXT = gql`
  query meContext {
    item: meContext {
      firstName
      lastName
      role
    }
  }
`;

const mocks = [
  // Mock for meContext query
  {
    request: {
      query: ME_CONTEXT,
    },
    result: {
      data: {
        item: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          role: "USER",
        },
      },
    },
  },
  // Successful login
  {
    request: {
      query: mutationUserLogin,
      variables: {
        data: {
          email: "test@example.com",
          password: "Password123!!",
        },
      },
    },
    result: {
      data: {
        item: {
          id: "1",
          firstName: "John",
        },
      },
    },
  },
  // Unsuccessful login
  {
    request: {
      query: mutationUserLogin,
      variables: {
        data: {
          email: "test@example.com",
          password: "Wrongpassword123!!",
        },
      },
    },
    error: new Error("Email ou mot de passe incorrect"),
  },
  // Failed to fetch
  {
    request: {
      query: mutationUserLogin,
      variables: {
        data: {
          email: "test@example.com",
          password: "AnyPassword!!22",
        },
      },
    },
    error: new Error("Failed to fetch"),
  },
];

// Scenario 1: SignIn test component & toast
describe("SignIn test component & toast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProvider>
          <SignIn />
        </UserProvider>
      </MockedProvider>,
    );
  });

  it("should render the initial component", () => {
    expect(
      screen.getByText("Se connecter", { selector: "h4" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Se connecter/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mot de passe oublié ?")).toBeInTheDocument();
    expect(screen.getByText("Première connexion ?")).toBeInTheDocument();
    expect(screen.getByText("Créez votre compte")).toBeInTheDocument();
    const forgotPasswordLink = screen.getByText("Mot de passe oublié ?");
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest("a")).toHaveAttribute(
      "href",
      "/forgot-password",
    );
    const signUpLink = screen.getByText("Créez votre compte");
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.closest("a")).toHaveAttribute("href", "/signup");
  });

  it("should update email and password fields and show password alerts", () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "password123" },
    });
    expect(screen.getByLabelText(/Email/)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/Mot de passe/)).toHaveValue("password123");
    expect(screen.getByText("9 caractères minimum")).toBeInTheDocument();
    expect(screen.getByText("Majuscule et minuscule")).toBeInTheDocument();
    expect(screen.getByText("Un nombre")).toBeInTheDocument();
    expect(screen.getByText("Un caractère spécial")).toBeInTheDocument();
  });

  it("should show success toast on successful login", async () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "Password123!!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Connexion réussie, bienvenue John", {
        iconTheme: { primary: "#ffffff", secondary: "#4caf50" },
        style: { background: "#4caf50", color: "#ffffff" },
      });
    });
  });

  it("should show error toast on unsuccessful login", async () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "Wrongpassword123!!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Email ou mot de passe incorrect", {
        iconTheme: { primary: "#ffffff", secondary: "#f44336" },
        style: { background: "#f44336", color: "#ffffff" },
      });
    });
  });

  it("should show error toast on error network or server down", async () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "AnyPassword!!22" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        "Erreur de connexion, veuillez réessayer",
        {
          iconTheme: { primary: "#ffffff", secondary: "#f44336" },
          style: { background: "#f44336", color: "#ffffff" },
        },
      );
    });
  });

  it("has a link to the forgot password page", () => {
    const forgotPasswordLink = screen.getByText("Mot de passe oublié ?");
    expect(forgotPasswordLink.closest("a")).toHaveAttribute(
      "href",
      "/forgot-password",
    );
  });

  it("has a link to the signup page", () => {
    const signUpLink = screen.getByText("Créez votre compte");
    expect(signUpLink.closest("a")).toHaveAttribute("href", "/signup");
  });
});

//Scenario 2: SignIn test graphQl mutation
describe("SignIn test graphQl mutation", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProvider>
          <SignIn />
        </UserProvider>
      </MockedProvider>,
    );
  });

  it("should make a GraphQL mutation call when the button is clicked", async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email/), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Mot de passe/), {
        target: { value: "Password123!!" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));
    });

    await waitFor(() => {
      const loginMutationCall = mocks.find(
        (op) =>
          op.request.query === mutationUserLogin &&
          op.request.variables.data.email === "test@example.com" &&
          op.request.variables.data.password === "Password123!!",
      );
      expect(loginMutationCall).toBeDefined();
    });
  });
});
