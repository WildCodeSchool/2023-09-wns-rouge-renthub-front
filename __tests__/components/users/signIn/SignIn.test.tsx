import "@testing-library/jest-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  ApolloProvider,
} from "@apollo/client";
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
import { mutationUserLogin } from "@/graphql/Users";

// Mocks React-Hot-Toast
jest.mock("react-hot-toast");

// Mock GraphQL requests simulation
const mocks = [
  // Successful login
  {
    request: {
      query: mutationUserLogin,
      variables: {
        data: {
          email: "test@example.com",
          password: "password123",
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
          password: "wrongpassword123",
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
          password: "anyPassword",
        },
      },
    },
    error: new Error("Failed to fetch"),
  },
];

// Scenario 1: SignIn test component & toast
describe("SignIn test component & toast", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignIn />
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
    expect(screen.getByText("Créer votre compte")).toBeInTheDocument();
    const forgotPasswordLink = screen.getByText("Mot de passe oublié ?");
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest("a")).toHaveAttribute(
      "href",
      "/forgot-password",
    );
    const signUpLink = screen.getByText("Créer votre compte");
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
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Connexion réussie, bienvenue John", {
        style: { background: "#4caf50", color: "#f8f8f8" },
      });
    });
  });
  it("should show error toast on unsuccessful login", async () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "wrongpassword123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Email ou mot de passe incorrect", {
        style: { background: "#f44336", color: "#f8f8f8" },
      });
    });
  });
  it("should show error toast on error network or server down", async () => {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: { value: "anyPassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Failed to fetch", {
        style: { background: "#f44336", color: "#f8f8f8" },
      });
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
    const signUpLink = screen.getByText("Créer votre compte");
    expect(signUpLink.closest("a")).toHaveAttribute("href", "/signup");
  });
});

// Scenario 2: SignIn test graphQl mutation
describe("SignIn test graphQl mutation", () => {
  let graphQlMutation = [];

  const mockLink = new ApolloLink((mutation, forward) => {
    graphQlMutation.push(mutation);
    return forward(mutation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: mockLink,
  });

  beforeEach(() => {
    graphQlMutation = [];
    render(
      <ApolloProvider client={client}>
        <SignIn />
      </ApolloProvider>,
    );
  });
  it("should make a GraphQL mutation call when the button is clicked", async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email/), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Mot de passe/), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Se connecter/ }));
    });
    await waitFor(() => {
      const loginMutationCall = graphQlMutation.find(
        (op) => op.operationName === "userLogin",
      );
      expect(loginMutationCall).toBeDefined();
    });
  });
});
