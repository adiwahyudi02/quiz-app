import { localStorageKey } from "@/constants/localstorage";
import { useAppDispatch } from "@/store";
import { selectScore, updateScore } from "@/store/slices/quizSlice";
import { getItem, removeItem } from "@/utils/localstorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useSyncScore = () => {
  const dispatch = useAppDispatch();
  const score = useSelector(selectScore);
  const formattedScore = `${score} %`;

  const resetScore = () => {
    removeItem(localStorageKey.score);
    dispatch(updateScore(0));
  };

  // sync the score with the localstorage
  useEffect(() => {
    const scoreStorage = getItem(localStorageKey.score);
    dispatch(updateScore(scoreStorage));
  }, [dispatch]);

  return {
    score,
    formattedScore,
    resetScore,
  };
};
