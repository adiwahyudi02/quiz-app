import { useRouter as useRouterOriginal } from "next/router";

const mockUseRouter = (overrides = {}) => {
  const useRouter = useRouterOriginal as jest.Mock;
  useRouter.mockReturnValue({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    ...overrides,
  });

  return useRouter;
};

export default mockUseRouter;
