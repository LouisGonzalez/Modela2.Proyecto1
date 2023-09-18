let cursosPrioritarios = [];
let cursosNoPriotirarios = [];
let cursosSinHogar = [];
let salones = [];

//Limpia la data obtenida de la base de datos para manejarla segun lo requiere el metodo
const limpiarData = (dataCursos, dataSalones) => {
    salones = [];
    cursosPrioritarios = [];
    cursosNoPriotirarios = [];
    cursosSinHogar = [];
    asignaciones = dataCursos;
    dataSalones.forEach(salon => {
        const nuevoSalon = {
          ...salon,
          espacios: [
            {
              hora: "2:00pm - 3:00pm",
              curso: undefined,
            },
            {
              hora: "3:00pm - 4:00pm",
              curso: undefined,
            },
            {
              hora: "4:00pm - 5:00pm",
              curso: undefined,
            },
            {
              hora: "5:00pm - 6:00pm",
              curso: undefined,
            },
          ],
        };
        salones.push(nuevoSalon);
    })
}

const generarHorario = (dataCursos, dataSalones) => {
    let result = {};
    const asignacionesCompletas = [];
    limpiarData(dataCursos, dataSalones);
    console.log('hola');
    separarCursosPorPrioridad(dataCursos)
    cursosPrioritarios.forEach(curso => {
      encontrarSalon(curso, salones, [])
    });
    cursosNoPriotirarios.forEach(curso => {
      encontrarSalon(curso, salones, [])
    })

    salones.forEach((salon) => {
      salon.espacios.forEach((espacio) => {
        console.log("Salon", salon.noSalon, "-", espacio.hora, espacio.curso);
        asignacionesCompletas.push({
          salon: salon.noSalon,
          horario: espacio.hora,
          curso: espacio.curso,
          carrera: espacio.carrera
        });
      });
    });


    result = {
        asignaciones: asignacionesCompletas,
        cursosSinHogar: cursosSinHogar
    }
    return result;
}


const separarCursosPorPrioridad = (dataCursos) => {
    dataCursos.forEach(curso => {
        if(curso.prioritario === 1){
            cursosPrioritarios.push(curso);
        } else if(curso.prioritario === 0) {
            cursosNoPriotirarios.push(curso);
        }
    })
}


//Metodo para verificar que salon tiene el menor numero de asientos desperdiciado por curso
//export const encontrarSalon = (curso: Curso, salones: Array<any>, salonesDescartados: Array<number>, carrera: string) => {
const encontrarSalon = (curso, salones, salonesDescartados) => {
    let salonElegido = { noSalon: 0, asientosVacios: -1 };
    for(let i = 0; i < salones.length; i++){
        if(salonesDescartados.includes(i)) continue;
        if(curso.noAsignados === salones[i].noAsientos){
          //con este salon se procede a verificar si tiene espacios disponibles en el horario
          salonElegido = { noSalon: i, asientosVacios: 0 };
          break;
        } else if(curso.noAsignados < salones[i].noAsientos){
            let aux = { noSalon: i, asientosVacios: salones[i].noAsientos - curso.noAsignados }
            if(salonElegido.asientosVacios === -1){
                salonElegido = aux;
            } else {    
                if(aux.asientosVacios < salonElegido.asientosVacios ){
                    salonElegido = aux;
                }
            }   
        }    
    }
    //No hay salon que pueda cumplir con la cantidad correcta de asientos para este curso
    if(salonElegido.asientosVacios === -1){
       console.log('Error para el curso ',curso.carrera, ' ',curso.nombre_curso,salonElegido.asientosVacios);
       cursosSinHogar.push({
        carrera: curso.carrera,
        curso: curso.nombre_curso
       })
    } else {
      //Para este punto ya se tiene el salon a verificar si tiene espacios vacios
      const salon = salones[salonElegido.noSalon];
      let encontrado = false;
      for (let i = 0; i < salon.espacios.length; i++) {
        if (salon.espacios[i].curso === undefined) {
          salon.espacios[i].curso = curso.nombre_curso;
          salon.espacios[i].carrera = curso.carrera;
          encontrado = true;
          break;
        }
      }
      if (!encontrado) {
        salonesDescartados.push(salonElegido.noSalon);
        encontrarSalon(curso, salones, salonesDescartados, curso.carrera);
      }
    }
}


module.exports = {
    generarHorario
}