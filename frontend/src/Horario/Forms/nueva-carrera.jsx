import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../components/Dialog/dialog";
import { Box, Button, Grid, TextField } from "@mui/material";
import { CustomTextField } from "../../components/Textfield/textfield";

export function NuevaCarrera(props) {
  const [nombre, setNombre] = useState("");

  const crearCatedratico = () => {
    fetch("http://localhost:8080/api/carreras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error fetching", error));
    props.setDialogCarrera(false);
  };

  return (
    <>
      <CustomDialog
        title="Nueva Carrera"
        onClose={() => {
          props.setDialogCarrera(false);
        }}
        open={props.dialogCarrera}
      >
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12}>
            Nombre
            <CustomTextField
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ marginTop: 3, position: "relative" }}>
              <Button
                variant="contained"
                color="success"
                onClick={crearCatedratico}
              >
                Confirmar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
}
