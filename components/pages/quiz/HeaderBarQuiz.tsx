import { CloseIconButton } from "@/components/commons/CloseIconButton";
import { HeaderBar } from "@/components/commons/HeaderBar";
import { InfoIconButton } from "@/components/commons/InfoIconButton";
import { ProgressBar } from "@/components/commons/ProgressBar";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

interface IHeaderBarQuiz {
  progressValue: number;
}

// Dynamically import
const DynamicDialogInfoQuiz = dynamic(
  () => import("./DialogInfoQuiz").then((module) => module.DialogInfoQuiz),
  { ssr: false }
);

const DynamicDialogExit = dynamic(
  () =>
    import("@/components/commons/DialogExit").then(
      (module) => module.DialogExit
    ),
  { ssr: false }
);

export const HeaderBarQuiz = ({ progressValue }: IHeaderBarQuiz) => {
  const { push } = useRouter();
  const [isDialogInfoOpen, setIsDialogInfoOpen] = useState(false);
  const [isDialogExitOpen, setIsDialogExitOpen] = useState(false);

  const handleToogleDialogInfo = () => {
    setIsDialogInfoOpen((prev) => !prev);
  };

  const handleToogleDialogExit = () => {
    setIsDialogExitOpen((prev) => !prev);
  };

  const handleExitDialogExit = () => {
    push("/");
  };

  return (
    <>
      <HeaderBar yellow>
        <Toolbar>
          <CloseIconButton onClick={handleToogleDialogExit} />
          <Box sx={{ width: "100%" }}>
            <ProgressBar
              variant="determinate"
              value={progressValue}
              aria-label="Proggress"
            />
          </Box>
          <InfoIconButton onClick={handleToogleDialogInfo} />
        </Toolbar>
      </HeaderBar>

      <DynamicDialogInfoQuiz
        open={isDialogInfoOpen}
        onClose={handleToogleDialogInfo}
      />
      <DynamicDialogExit
        open={isDialogExitOpen}
        onStay={handleToogleDialogExit}
        onExit={handleExitDialogExit}
      />
    </>
  );
};
