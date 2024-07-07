import "@testing-library/jest-dom";
import "jest-canvas-mock";
import mockUseRouter from "./__mocks__/mockUseRouter";
import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Export the mockUseRouter utility for usage in tests
export { mockUseRouter };
