let listaEstudiantes = [];

const formulario = document.getElementById("formularioEstudiante");

formulario.addEventListener("submit", function(Evento){
Evento.prevenDefault();

let nombre = document.getElementById("nombre").value;
let edad = document.getElementById("Edad").value;
let nota1= document.getElementById("nota1").value;
let nota2 = document.getElementById("nota2").value;
let nota3 = document.getElementById("nota3").value;

if(nombre === "" || isNaN(edad) || isNaN(nota1) || isNaN(nota2)|| isNaN(nota3)){
    alert("Por favor, rellene todos los campos");
    return;
}
let promedio =(nota1 + nota2 + nota3)/3;
let estado= promedio >= 6? "Aprobado" : "Reprobado";
let estudiante ={
    nombre: nombre,
    edad: edad,
    promedio: promedio,
    estado: estado
};
listaEstudiantes.push(estudiante);
mostrarEstudiantes();
formulario.reset();
});

function mostarEstudiantes(){
    let tabla = document.getElementById("tablaEstudiantes");
    tabla.innerHTML ="";
     for (let i = 0; i < listadeEstidiantes.length; i++){
        let fila = ` 
        <tr>
            <td>${listaEstudiantes[i].nombre}</td>
            <td>${listaEstudiantes[i].edad}</td>
            <td>${listaEstudiantes[i].promedioi}</td>
            <td>${listaEstudiantes[i].estado}</td>

        </tr>
     `;
        tabla.innerHTML += fila;
     }
}