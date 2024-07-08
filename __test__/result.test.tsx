import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Result from "../pages/result/index";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { getItem, setItem } from "@/utils/localstorage";
import { localStorageKey } from "@/constants/localstorage";
import { initialStateQuizSlice } from "@/store/slices/quizSlice";

describe("Result Page", () => {
  it("renders the points card", () => {
    renderWithProviders(<Result />);
    const points = screen.getAllByTestId("points-card");
    expect(points.length).toBeTruthy();
  });

  it("renders the score card", () => {
    renderWithProviders(<Result />);
    const score = screen.getAllByTestId("score-card");
    expect(score.length).toBeTruthy();
  });

  it("get the score from localstorage correctly", () => {
    // Set a mock score in localStorage
    setItem(localStorageKey.score, 100);

    renderWithProviders(<Result />, {
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

  it("get the points form localstorage correctly", () => {
    // Set a mock score in localStorage
    setItem(localStorageKey.points, 25);

    renderWithProviders(<Result />, {
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
});
