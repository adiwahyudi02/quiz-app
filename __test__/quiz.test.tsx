import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import Quiz from "../pages/quiz";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { mockUseRouter } from "@/jest.setup";
import { initialStateQuizSlice } from "@/store/slices/quizSlice";
import { mockQuestionsData } from "@/__mocks__/mockQuestionsData";
import { setupServer } from "msw/node";
import { handlers } from "@/__mocks__/requestHandlers";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const activeQuestionIndex = 1;

const server = setupServer(...handlers);

describe("Quiz Page", () => {
  beforeEach(() => {
    mockUseRouter({
      push: jest.fn(() => Promise.resolve(true)),
    });
  });

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("renders the close button", () => {
    renderWithProviders(<Quiz />);
    const closeButton = screen.getByTestId("close-quiz-button");

    expect(closeButton).toBeInTheDocument();
  });

  it("renders the info button", () => {
    renderWithProviders(<Quiz />);
    const infoButton = screen.getByTestId("info-quiz-button");
    expect(infoButton).toBeInTheDocument();
  });

  it("show the info dialog when click the info quiz button", () => {
    renderWithProviders(<Quiz />);
    const infoButton = screen.getByTestId("info-quiz-button");

    // open the dialog
    fireEvent.click(infoButton);
    const dialogInfo = screen.getByTestId("dialog-info");
    expect(dialogInfo).toBeInTheDocument();
  });

  it("renders the progress & calculate the value of the progress", () => {
    renderWithProviders(<Quiz />, {
      preloadedState: {
        quiz: {
          ...initialStateQuizSlice,
          questions: mockQuestionsData,
          activeQuestion: {
            ...mockQuestionsData.at(activeQuestionIndex)!,
            no: 2,
          },
        },
      },
    });

    const progress = screen.getByTestId("progress-quiz");
    const progressValue = progress.getAttribute("aria-valuenow");
    expect(progress).toBeInTheDocument();
    expect(progressValue).toBe("33");
  });

  it("renders the slider of font size settings", () => {
    renderWithProviders(<Quiz />);
    const slider = screen.getByTestId("slider-font-size");
    expect(slider).toBeInTheDocument();
  });

  it("renders the passage content & get data from mocked rest api", async () => {
    renderWithProviders(<Quiz />);

    const passage = screen.getByTestId("passage-panel");
    expect(
      await screen.findByText(
        /My name is Lisa. I wake up at 7 o'clock every morning. I take a shower and get dressed. Then, I have breakfast with my family. After that, I go to school. I study English and math. I have lunch at 12 o'clock. In the afternoon, I have art class. I go home at 4 o'clock. In the evening, I watch TV and do my homework. I go to bed at 9 o'clock./i
      )
    ).toBeInTheDocument();
    expect(passage).toBeInTheDocument();
  });

  it("renders the tab content correctly", async () => {
    renderWithProviders(<Quiz />, {
      preloadedState: {
        quiz: {
          ...initialStateQuizSlice,
          activeQuestion: {
            ...mockQuestionsData.at(activeQuestionIndex)!,
            no: 2,
          },
        },
      },
    });

    // at first will render the passage panel
    const passagePanel = screen.getByTestId("passage-panel");
    expect(passagePanel).toBeInTheDocument();

    const passageTab = screen.getByText("Passage").closest("button");
    const questionsTab = screen.getByText("Questions").closest("button");

    // renders the tab buttons
    expect(passageTab).toBeInTheDocument();
    expect(questionsTab).toBeInTheDocument();

    // renders the questions panel
    fireEvent.click(questionsTab!);
    const questionsPanel = screen.getByTestId("questions-panel");
    expect(questionsPanel).toBeInTheDocument();
  });

  it("renders the questions content", async () => {
    renderWithProviders(<Quiz />, {
      preloadedState: {
        quiz: {
          ...initialStateQuizSlice,
          activeQuestion: {
            ...mockQuestionsData.at(activeQuestionIndex)!,
            no: 2,
          },
        },
      },
    });

    // renders the question
    const questionsTab = screen.getByText("Questions").closest("button");
    fireEvent.click(questionsTab!);
    const questionsPanel = screen.getByTestId("questions-panel");
    expect(questionsPanel).toBeInTheDocument();

    // renders the options
    const options =
      mockQuestionsData.at(activeQuestionIndex)?.question_data.options || [];
    for (let i = 0; i < options.length; i++) {
      const option = screen.getByTestId(`quiz-options-${options[i]}`);
      expect(option).toBeInTheDocument();
    }
  });
});
