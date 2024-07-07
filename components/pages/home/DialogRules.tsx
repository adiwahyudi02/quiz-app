import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
} from "@mui/material";

interface IDialogRules extends Omit<DialogProps, "children"> {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const DialogRules = ({
  open,
  onClose,
  onStart,
  ...props
}: IDialogRules) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="rules-dialog-title"
    aria-describedby="rules-dialog-description"
    data-testid="dialog-rules"
    {...props}
  >
    <DialogTitle id="rules-dialog-title">Scoring Rules</DialogTitle>
    <DialogContent>
      <DialogContentText id="rules-dialog-description">
        1. Your current score will start with 0%
        <br />
        2. The Points will be increased every time you answer a question
      </DialogContentText>
    </DialogContent>
    <DialogActions
      sx={{
        padding: "20px",
        "& button": {
          textTransform: "none",
          borderRadius: "10px",
        },
      }}
    >
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="warning" onClick={onStart} autoFocus>
        Start
      </Button>
    </DialogActions>
  </Dialog>
);
