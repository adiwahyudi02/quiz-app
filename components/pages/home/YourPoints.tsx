import { useSyncPoints } from "@/hooks/useSyncPoints";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import PointImage from "@/assets/images/point.webp";

export const YourPoints = () => {
  const { points } = useSyncPoints();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Image src={PointImage} alt="point-image" width={20} height={20} />
      <Typography variant="h6" textAlign="center">
        {points} Points
      </Typography>
    </Stack>
  );
};
