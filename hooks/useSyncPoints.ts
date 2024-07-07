import { localStorageKey } from "@/constants/localstorage";
import { useAppDispatch } from "@/store";
import { selectPoints, updatePoints } from "@/store/slices/quizSlice";
import { getItem } from "@/utils/localstorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useSyncPoints = () => {
  const dispatch = useAppDispatch();
  const points = useSelector(selectPoints);

  // sync the points with the localstorage
  useEffect(() => {
    const pointsStorage = getItem(localStorageKey.points);
    dispatch(updatePoints(pointsStorage));
  }, [dispatch]);

  return {
    points,
  };
};
