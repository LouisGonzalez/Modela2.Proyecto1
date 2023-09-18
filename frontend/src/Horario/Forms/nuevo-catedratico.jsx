import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../components/Dialog/dialog";
import { Box, Button, Grid, TextField } from "@mui/material";
import { CustomTextField } from "../../components/Textfield/textfield";

export function NuevoCatedratico(props) {

    const [nombre, setNombre] = useState('');
    const [horaEntrada, setHoraEntrada] = useState(0);
    const [horaSalida, setHoraSalida]= useState(0);
    const [cualificaciones, setCualificaciones] = useState('');

    const crearCatedratico = () => {
        fetch("http://localhost:8080/api/catedraticos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
                cualificaciones: cualificaciones
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.error("Error fetching",error));
        props.setDialogCatedratico(false);
    }

    return (
    <>
      <CustomDialog
        title="Nuevo Catedratico"
        onClose={() => {
          props.setDialogCatedratico(false);
        }}
        open={props.dialogCatedratico}
      >
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12}>
            Nombre
            <CustomTextField value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            Hora de entrada
            <CustomTextField value={horaEntrada} onChange={(e) => setHoraEntrada(e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            Hora de salida
            <CustomTextField value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            Cualificaciones
            <CustomTextField value={cualificaciones} onChange={(e) => setCualificaciones(e.target.value)}/>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ marginTop: 3, position: "relative" }}>
              <Button variant="contained" color="success" onClick={crearCatedratico}>
                Confirmar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
}
