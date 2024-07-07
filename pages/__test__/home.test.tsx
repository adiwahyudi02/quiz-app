import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import Home from "../index";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { mockUseRouter } from "@/jest.setup";
import { clearStorage, getItem, setItem } from "@/utils/localstorage";
import { localStorageKey } from "@/constants/localstorage";
import { initialStateQuizSlice } from "@/store/slices/quizSlice";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    mockUseRouter({
      push: jest.fn(() => Promise.resolve(true)),
    });
  });

  beforeEach(() => {
    clearStorage();
  });

  it("renders the greeting", () => {
    renderWithProviders(<Home />);
    const greeting = screen.getByTestId("greeting");

    expect(greeting).toBeInTheDocument();
  });

  it("renders the points", () => {
    renderWithProviders(<Home />);
    const points = screen.getByTestId("your-points");

    expect(points).toBeInTheDocument();
  });

  it("get the current score correctly", () => {
    // Set a mock score in localStorage
    setItem(localStorageKey.score, 100);

    renderWithProviders(<Home />, {
      preloadedState: {
        quiz: {
          ...initialStateQuizSlice,
          score: getItem<number>(localStorageKey.score) || 0, // Get the score from localStorage
        },
      },
    });

    const score = screen.getByText(/100/i);
    expect(score).toBeInTheDocument();
  });

  it("get the points correctly", () => {
    // Set a mock score in localStorage
    setItem(localStorageKey.points, 25);

    renderWithProviders(<Home />, {
      preloadedState: {
        quiz: {
          ...initialStateQuizSlice,
          points: getItem<number>(localStorageKey.points) || 0, // Get the points from localStorage
        },
      },
    });

    const points = screen.getByText(/25/i);
    expect(points).toBeInTheDocument();
  });

  it("renders the current lessons", () => {
    renderWithProviders(<Home />);
    const lesson = screen.getByTestId("lesson");

    expect(lesson).toBeInTheDocument();
  });

  it("show the dialog rules when click the start the lesson button", () => {
    renderWithProviders(<Home />);
    const startButton = screen.getByTestId("start-lesson-button");

    fireEvent.click(startButton);

    const dialogRules = screen.getByTestId("dialog-rules");
    expect(dialogRules).toBeInTheDocument();
  });
});
