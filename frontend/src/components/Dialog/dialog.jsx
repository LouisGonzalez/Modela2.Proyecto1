import { Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = (
    props
) => {
    const { children, onClick, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClick ? (
                <IconButton
                    aria-label="close"
                    onClick={onClick}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export function CustomDialog(props) {
     return (
        <Dialog
            open={props.open || false}
            onClose={() => props.onClose && props.onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth
        >
            <CloseButton onClick={() => props.onClose && props.onClose()} />
            <Box sx={{ marginLeft: 3, marginRight: 6, marginBottom: 4 }}>
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
            </Box>
        </Dialog>
     )
}