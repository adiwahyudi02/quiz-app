import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogProps,
} from "@mui/material";

interface IDialogExit extends Omit<DialogProps, "children"> {
  open: boolean;
  onExit: () => void;
  onStay: () => void;
}

export const DialogExit = ({ open, onStay, onExit, ...props }: IDialogExit) => (
  <Dialog
    open={open}
    onClose={onStay}
    aria-labelledby="exit-dialog-title"
    {...props}
  >
    <DialogTitle id="exit-dialog-title">Do you want to exit?</DialogTitle>
    <DialogActions
      sx={{
        padding: "20px 24px",
        flexDirection: "column",
        gap: "15px",
        "& button": {
          width: "100%",
          textTransform: "none",
          borderRadius: "10px",
        },
      }}
    >
      <Button
        size="large"
        variant="contained"
        color="success"
        onClick={onStay}
        autoFocus
      >
        Stay
      </Button>
      <Button size="large" color="error" onClick={onExit}>
        Exit
      </Button>
    </DialogActions>
  </Dialog>
);
