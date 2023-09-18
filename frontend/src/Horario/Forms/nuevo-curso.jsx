import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../components/Dialog/dialog";
import { Box, Button, Grid, MenuItem, Select } from "@mui/material";
import { CustomTextField } from "../../components/Textfield/textfield";

const sxProps = {
    "& .MulInputBase-root": {
      height: 45,
    },
    background: "#FFFFFF",
    width: 1,
};


export function NuevoCurso(props) {

  const [prioritario, setPrioritario] = useState('SI');
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState(1);
  const [noAsignados, setNoAsignados] = useState(0);
  const [catedratico, setCatedratico] = useState(0);

  const handlePrioritario = (event) => {
    setPrioritario(event.target.value);
 }

  const crearCurso = () => {
    const esPrioritario = prioritario === 'SI' ? 1 : 0;
    fetch("http://localhost:8080/api/cursos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            carrera: carrera,
            noAsignados: noAsignados,
            catedratico: catedratico,
            prioritario: esPrioritario
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.error("Error fetching schedule:", error));
    props.setDialogCurso(false);
  }

  return (
    <>
      <CustomDialog
        title="Nuevo Curso"
        onClose={() => {
          props.setDialogCurso(false);
        }}
        open={props.dialogCurso}
      >
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12}>
            Nombre
            <CustomTextField
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            Carrera
            <CustomTextField
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
            />
          </Grid>{" "}
          <Grid item xs={6}>
            No. Asignados
            <CustomTextField
              value={noAsignados}
              onChange={(e) => setNoAsignados(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            Catedratico
            <CustomTextField
              value={catedratico}
              onChange={(e) => setCatedratico(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            Prioritario
            <Select
              value={prioritario}
              onChange={handlePrioritario}
              sx={sxProps}
            >
              <MenuItem value={"SI"}>SI</MenuItem>
              <MenuItem value={"NO"}>NO</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ marginTop: 3, position: "relative" }}>
              <Button variant="contained" color="success" onClick={crearCurso}>
                Confirmar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
}
