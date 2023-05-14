import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const AlertDialogWithTwoAction = ({open, status, message, handleOkClick, handleDiscardClick}) => {
  return (
    <Dialog PaperProps={{style:{borderRadius:12}}} open={open}>
        <DialogTitle>{status}</DialogTitle>
        <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button onClick={handleDiscardClick}>Cancel</Button>
        <Button onClick={handleOkClick} autoFocus>Okay</Button>
        </DialogActions>
    </Dialog>
  )
}