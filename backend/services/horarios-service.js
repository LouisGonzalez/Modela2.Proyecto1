let salones = [];
let asignaciones = [];
let cursosSinHogar = [];

//Limpia la data obtenida de la base de datos para manejarla segun lo requiere el metodo
const limpiarData = (dataCursos, dataSalones) => {
    salones = [];
    asignaciones = [];
    cursosSinHogar = [];
    asignaciones = dataCursos;
    dataSalones.forEach(salon => {
        const nuevoSalon = {
          ...salon,
          espacios: [
            {
              hora: "2 a 3",
              curso: undefined,
            },
            {
              hora: "3 a 4",
              curso: undefined,
            },
            {
              hora: "4 a 5",
              curso: undefined,
            },
            {
              hora: "4 a 6",
              curso: undefined,
            },
          ],
        };
        salones.push(nuevoSalon);
    })
}

const generarHorario3 = (dataCursos, dataSalones) => {   
    //Un arreglo de nodos que ya se recorrieron para omitirlos
    // console.log(      "-----------------------------------------------------------------------------------"    );
    // console.log('DATA DE CURSOS', dataCursos);
    // console.log('-----------------------------------------------------------------------------------')
    // console.log('DATA SALONES', dataSalones);
    // console.log('--------------------------------------------------------------------------------------')
    let result = {};
    const asignacionesCompletas = [];
    limpiarData(dataCursos, dataSalones);
    asignaciones.forEach(curso => {
        encontrarSalon(curso, salones, []);
    })
    salones.forEach(salon => {
        salon.espacios.forEach(espacio => {
            console.log('Salon',salon.noSalon,'-',espacio.hora,espacio.curso)
            asignacionesCompletas.push({
                salon: salon.noSalon,
                horario: espacio.hora,
                curso: espacio.curso
            })
        });
    });
    result = {
        asignaciones: asignacionesCompletas,
        cursosSinHogar: cursosSinHogar
    }
    return result;
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
       console.log(' curso ',curso.carrera, ' ',curso.nombre_curso,salonElegido.asientosVacios);
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
          salon.espacios[i].curso = curso.carrera + ' ' + curso.nombre_curso;
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
    generarHorario3
}