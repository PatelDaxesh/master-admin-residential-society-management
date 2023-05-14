import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const AlertDialog = ({open, status, message, handleOnClick}) => {
  return (
    <Dialog PaperProps={{style:{borderRadius:12}}} open={open}>
        <DialogTitle>{status}</DialogTitle>
        <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button onClick={handleOnClick} autoFocus>Okay</Button>
        </DialogActions>
    </Dialog>
  )
}