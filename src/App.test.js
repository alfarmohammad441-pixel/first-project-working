import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App.jsx';
import Authprovider from "./context/Authcontext";
import axios from "axios";
import Dashbord from "./pages/students/dashbord";

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

test("renders dashboard counts and active exams from the API", async () => {
  const endpoints = {
    REACT_APP_API_backendURL6: "http://localhost:3200/totalstudent",
    REACT_APP_API_backendURL7: "http://localhost:3200/totalsubject",
    REACT_APP_API_backendURL8: "http://localhost:3200/totalpayment",
    REACT_APP_API_backendURL9: "http://localhost:3200/totalexams",
    REACT_APP_API_backendURL10: "http://localhost:3200/totalcenter",
    REACT_APP_API_backendURL11: "http://localhost:3200/totalspecialization",
    REACT_APP_API_backendURL12: "http://localhost:3200/totalcoordintator",
    REACT_APP_API_backendURL13: "http://localhost:3200/examstable",
  };
  Object.assign(process.env, endpoints);
  axios.get.mockImplementation((url) => {
    const responses = {
      "/totalstudent": { totalStudent: 14 },
      "/totalsubject": { totalSubject: 15 },
      "/totalpayment": { totalpayment: 15 },
      "/totalexams": { totalexams: 15 },
      "/totalcenter": { totalcenter: 8 },
      "/totalspecialization": { totalspecialization: 4 },
      "/totalcoordintator": { Totalcoordintator: 3 },
      "/examstable": [
        {
          ID: 6,
          examdate: "2027-03-01",
          subjectname: "Web development",
          starttime: "09:00",
          endtime: "10:00",
          examname: "Main center",
        },
      ],
    };
    return Promise.resolve({ data: responses[new URL(url).pathname] });
  });

  render(<Dashbord />);

  expect(await screen.findByText("Main center")).toBeInTheDocument();
  expect(screen.getByText("Web development")).toBeInTheDocument();
  expect(screen.getByText("14")).toBeInTheDocument();
  expect(screen.getByText("8")).toBeInTheDocument();
});
