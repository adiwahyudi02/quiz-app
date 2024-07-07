import { CardStats } from "@/components/commons/CardStats";
import { useSyncScore } from "@/hooks/useSyncScore";

interface IScoreCard {
  heading?: string;
}

export const ScoreCard = ({ heading = "Score" }: IScoreCard) => {
  const { formattedScore } = useSyncScore();

  return <CardStats heading={heading} value={formattedScore} blue />;
};
