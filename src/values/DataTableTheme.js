import { createTheme } from "@mui/material/styles"
import { colors } from './Colors'

export const dataTableTheme =
createTheme({
    components: {
    MuiPaper:{
        styleOverrides:{
            root:{
                borderRadius:'16px',
                boxShadow:`0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)`
            }
        }
    },
    MuiTableRow:{
        styleOverrides:{
            root:{
                cursor: 'pointer'
            }
        }
    },
    MuiButton:{
        styleOverrides:{
            root:{
                color: colors.textColor,
                fontSize: '1.1rem',
                fontFamily: 'PoppinsSemiBold',
                borderRadius:'8px',
                border: `2px solid ${colors.secondaryColor}`
            },
        }
    },
    MuiTableCell: {
        styleOverrides:{
            root: {
                color: colors.secondaryTextColor,
                fontSize: '1rem',
                fontFamily: 'PoppinsRegular'
            }
        }
    },
    MuiToolbar: {
        styleOverrides:{
            regular: {
            minHeight: '8px'
        },
        }
    }
    }
})