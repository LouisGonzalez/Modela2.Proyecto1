import './list.css';

export function List(props) {
    return (
        <div className='lista-de-datos'>
            <h1>Listado de cursos sin espacio</h1>
            <ul className='lista'>
                {props.data.map((dato, index) => (
                    <li key={index}>Carrera: {dato.carrera} Curso: {dato.curso}</li>
                ))}
            </ul>
        </div>
    )
}