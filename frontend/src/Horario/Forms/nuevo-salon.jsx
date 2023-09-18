
import React, { useEffect, useState } from "react"
import { CustomDialog } from "../../components/Dialog/dialog";
import { Box, Button, Grid } from "@mui/material";
import { CustomTextField } from "../../components/Textfield/textfield";

export function NuevoSalon(props) {

    const [noSalon, setNoSalon ] = useState(1);
    const [noAsientos, setNoAsientos] = useState(0);

    const crearSalon = () => {
        fetch("http://localhost:8080/api/salon", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noSalon: noSalon,
                noAsientos: noAsientos
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.error("Error fetching",error));
        props.setDialogSalon(false);
    }

    return (
      <>
        <CustomDialog
          title="Nuevo Salon"
          onClose={() => {
            props.setDialogSalon(false);
          }}
          open={props.dialogSalon}
        >
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={6}>
              No. Salon
              <CustomTextField value={noSalon} onChange={(e) => setNoSalon(e.target.value)}/>
            </Grid>
            <Grid item xs={6}>
              No. Asientos
              <CustomTextField value={noAsientos} onChange={(e) => setNoAsientos(e.target.value)}/>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ marginTop: 3, position: "relative" }}>
                <Button variant="contained" color="success" onClick={crearSalon}>
                  Confirmar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CustomDialog>
      </>
    );
}