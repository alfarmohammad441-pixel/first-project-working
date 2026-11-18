import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App.jsx';
import Authprovider from "./context/Authcontext";
import axios from "axios";

jest.mock("axios");

test('renders the login page', () => {
  render(
    <MemoryRouter
      basename="/first-project-working"
      initialEntries={["/first-project-working/"]}
    >
      <Authprovider>
        <App />
      </Authprovider>
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
});

test("shows a message instead of crashing when the login API returns 404", async () => {
  axios.isAxiosError.mockReturnValue(true);
  axios.get.mockRejectedValue({ response: { status: 404 } });

  render(
    <MemoryRouter basename="/first-project-working" initialEntries={["/first-project-working/"]}>
      <Authprovider>
        <App />
      </Authprovider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
    target: { value: "student" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
    target: { value: "wrong-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "login" }));

  expect(await screen.findByText("Login service error (404).")).toBeInTheDocument();
});
