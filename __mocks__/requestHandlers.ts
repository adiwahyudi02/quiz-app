import { rest } from "msw";
import { mockQuestionsData } from "./mockQuestionsData";

export const handlers = [
  rest.get("/questions", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockQuestionsData));
  }),
];
