import { CardStats } from "@/components/commons/CardStats";
import Image from "next/image";
import PointImage from "@/assets/images/point.webp";
import { Stack, Typography } from "@mui/material";
import { useSyncPoints } from "@/hooks/useSyncPoints";

export const PointsCard = () => {
  const { points } = useSyncPoints();

  const value = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Typography variant="h4" textAlign="center">
        {points}
      </Typography>
      <Image src={PointImage} alt="point-image" width={25} height={25} />
    </Stack>
  );

  return (
    <CardStats heading="Points" value={value} green data-testid="points-card" />
  );
};
