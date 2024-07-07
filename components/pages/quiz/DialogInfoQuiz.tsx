import {
  Box,
  Button,
  Dialog,
  DialogContentText,
  DialogProps,
} from "@mui/material";
import Image from "next/image";
import DialogAvatar from "@/assets/images/dialog-avatar.webp";

interface IDialogInfoQuiz extends Omit<DialogProps, "children"> {
  open: boolean;
  onClose: () => void;
}

export const DialogInfoQuiz = ({
  open,
  onClose,
  ...props
}: IDialogInfoQuiz) => (
  <Dialog
    open={open}
    sx={{
      "& .MuiPaper-root": {
        background: "linear-gradient(0deg,#fff 76.89%,#ffe88a 101.58%)",
        minHeight: "390px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "24px",
        padding: "24px",
        overflowY: "visible",
      },
    }}
    aria-describedby="info-dialog-description"
    data-testid="dialog-info"
    {...props}
  >
    <Box
      sx={{
        position: "absolute",
        top: "-70px",
      }}
    >
      <Image
        src={DialogAvatar}
        alt="dialog-avatar-image"
        width={120}
        height={120}
      />
    </Box>
    <DialogContentText
      id="info-dialog-description"
      sx={{
        marginTop: "100px",
        minHeight: "150px",
        textAlign: "center",
      }}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
    </DialogContentText>
    <Button
      variant="text"
      color="error"
      size="large"
      sx={{
        width: "85%",
        textTransform: "none",
        borderRadius: "10px",
        marginTop: "24px",
      }}
      data-testid="close-dialog-info-button"
      onClick={onClose}
    >
      Close
    </Button>
  </Dialog>
);
