import React, { useEffect, useState } from "react";
import "./Horario.css";
import { CustomDialog } from "../components/Dialog/dialog";
import { Box, Button, Grid, TextField } from "@mui/material";
import { CustomTextField } from "../components/Textfield/textfield";
import { NuevoCatedratico } from "./Forms/nuevo-catedratico";
import { NuevoSalon } from "./Forms/nuevo-salon";
import { NuevoCurso } from "./Forms/nuevo-curso";
import { List } from "../components/List/list";
import { NuevaCarrera } from "./Forms/nueva-carrera";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const timeSlots = [];
const startTime = 13;
const endTime = 20;

for (let hour = startTime; hour <= endTime; hour++) {
  for (let day = 0; day < daysOfWeek.length; day++) {
    const key = `${daysOfWeek[day]}-${hour}`;
    timeSlots.push({
      key,
      day: daysOfWeek[day],
      hour,
    });
  }
}

function Horario() {

  const [horario, setHorario ] = useState(undefined);
  const [dialogCatedratico, setDialogCatedratico ] = useState(false);
  const [dialogSalon, setDialogSalon] = useState(false);
  const [dialogCurso, setDialogCurso] = useState(false);
  const [dialogCarrera, setDialogCarrera] = useState(false);
  const datosTest = ['asdf','ryterty','xcvqqqq']

  //Generacaion de horario por espacios
  const horarioPorEspacios = () => {
        fetch("http://localhost:8080/api/horario/horario-por-espacios")
          .then((response) => 
            response.json()
          )
          .then((data) => {
              setHorario(data);
              console.log(data)
          })
          .catch((error) => console.error("Error fetching schedule:", error));
  }

  //Generacion de horario por prioridad de cursos
  const horarioPorCurso = () => {
    fetch("http://localhost:8080/api/horario/horario-por-curso")
    .then((response) => 
      response.json()
    )
    .then((data) => {
      setHorario(data);
      console.log(data)
    })
    .catch((error) => console.error("Error fetching schedule:",error));
  }

  const renderHorario = () => {
    const columnas = [];
    if(horario !== undefined){
      for (let i = 0; i < horario.noSalones; i++) {
        const space = (
          <div key={i} className="day-column">
            <div className="day">Salon {i + 1}</div>
            {horario.opciones[0].asignaciones.map(
              (asignacion) =>
                asignacion.salon === i + 1 && (
                  <div className="time-slot">
                    <div className="time">{asignacion.horario}</div>
                    <div className="event">{asignacion.curso}</div>
                    <div className="event">{asignacion.carrera}</div>
                  </div>
                )
            )}
          </div>
        );
        columnas.push(space);
      }
    }

    return columnas;
  }

  const renderHorariov2 = () => {
    const columnas = [];
    if (horario !== undefined) {
      for (let i = 0; i < horario.noSalones; i++) {
        const space = (
          <div key={i} className="day-column">
            <div className="day">Salon {i + 1}</div>
            {horario.opciones[1].asignaciones.map(
              (asignacion) =>
                asignacion.salon === i + 1 && (
                  <div className="time-slot">
                    <div className="time">{asignacion.horario}</div>
                    <div className="event">{asignacion.curso}</div>
                    <div className="event">{asignacion.carrera}</div>
                  </div>
                )
            )}
          </div>
        );
        columnas.push(space);
      }
    }

    return columnas;

  }


  return (
    <div className="schedule">
      <NuevaCarrera
        dialogCarrera={dialogCarrera}
        setDialogCarrera={setDialogCarrera}
      />
      <NuevoCatedratico
        dialogCatedratico={dialogCatedratico}
        setDialogCatedratico={setDialogCatedratico}
      />
      <NuevoSalon dialogSalon={dialogSalon} setDialogSalon={setDialogSalon} />
      <NuevoCurso dialogCurso={dialogCurso} setDialogCurso={setDialogCurso} />

      <Grid container rowSpacing={1} columnSpacing={1} sx={{ marginBottom: 5 }}>
        <Grid item xs={6}>
          <Button onClick={horarioPorEspacios}>Horario por espacios</Button>
          <Button onClick={horarioPorCurso}>Horario por cursos</Button>
        </Grid>
        <Grid item xs={6}>
          <div className="options">
            <Button
              variant="contained"
              onClick={() => setDialogCatedratico(true)}
            >
              Nuevo Catedratico
            </Button>{" "}
            <Button variant="contained" onClick={() => setDialogCurso(true)}>
              Nuevo Curso
            </Button>{" "}
            <Button variant="contained" onClick={() => setDialogSalon(true)}>
              Nuevo Salon
            </Button>
            <Button variant="contained" onClick={() => setDialogCarrera(true)}>
              Nuevo Carrera
            </Button>
          </div>
        </Grid>
      </Grid>
      {horario !== undefined && (
        <>
          <div className="time-slots">{renderHorario()}</div>
          <div>
            <List data={horario.opciones[0].cursosSinHogar} />
          </div>
          <div className="time-slots">{renderHorariov2()}</div>
          <div>
            <List data={horario.opciones[1].cursosSinHogar} />
          </div>
        </>
      )}
    </div>
  );
}

export default Horario;
