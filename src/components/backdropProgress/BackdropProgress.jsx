import { Backdrop, CircularProgress } from "@mui/material"
import { colors } from "../../values/Colors"

export const BackdropProgress = ({open}) => {
  return (
    <Backdrop
        sx={{ color: colors.primaryColor, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}>
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}