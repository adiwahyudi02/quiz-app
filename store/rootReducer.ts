import { combineReducers } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";

const rootReducer = combineReducers({
  quiz: quizReducer,
});

export default rootReducer;
