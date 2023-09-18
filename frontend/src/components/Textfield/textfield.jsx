import { TextField } from "@mui/material"

const stylesStatic = {
    background: '#FFFFFF',
    width: 1
}

export function CustomTextField (props) {
    const renderTextField = () => {
        let sxProps = { ...stylesStatic }

        if(!props.multiline) {
            if(props.type !== 'number'){
                sxProps = {
                    '& .MulInputBase-root': {
                        height: 45,
                    }, ...stylesStatic
                }
            }
        }
        return (
            <TextField
                sx={sxProps}
                {...props}
            />
        )
    }

    return <>{renderTextField()}</>
}