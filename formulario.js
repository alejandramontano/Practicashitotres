const form = document.getElementById("formulario");
const tabla = document.getElementById("tablaDatos");

document.addEventListener("DOMContentLoaded", cargar);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
        id_activo: id_activo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        ubicacion_actual: ubicacion_actual.value,
        tipo_movimiento: tipo_movimiento.value,
        fecha_movimiento: fecha_movimiento.value,
        ubicacion_destino: ubicacion_destino.value,
        responsable_anterior: responsable_anterior.value,
        nuevo_responsable: nuevo_responsable.value,
        motivo_movimiento: motivo_movimiento.value,
        costo_activo: costo_activo.value,
        valor_residual: valor_residual.value,
        vida_util: vida_util.value,
        comentarios: comentarios.value,
        preparado_por: preparado_por.value,
        autorizado_por: autorizado_por.value,
        recibido_por: recibido_por.value
    };

    let registros = JSON.parse(localStorage.getItem("activos")) || [];
    registros.push(datos);
    localStorage.setItem("activos", JSON.stringify(registros));

    cargar();
    form.reset();
});

function cargar() {
    tabla.innerHTML = "";
    let registros = JSON.parse(localStorage.getItem("activos")) || [];

    registros.forEach((d, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${d.id_activo}</td>
            <td>${d.descripcion}</td>
            <td>${d.categoria}</td>
            <td>${d.ubicacion_actual}</td>
            <td>${d.tipo_movimiento}</td>
            <td>${d.fecha_movimiento}</td>
            <td>${d.ubicacion_destino}</td>
            <td>${d.responsable_anterior}</td>
            <td>${d.nuevo_responsable}</td>
            <td>${d.motivo_movimiento}</td>
            <td>${d.costo_activo}</td>
            <td>${d.valor_residual}</td>
            <td>${d.vida_util}</td>
            <td>${d.comentarios}</td>
            <td>${d.preparado_por}</td>
            <td>${d.autorizado_por}</td>
            <td>${d.recibido_por}</td>
            <td><button onclick="borrar(${index})">🗑</button></td>
        `;
        tabla.appendChild(fila);
    });
}

function borrar(index) {
    if (!confirm("¿Eliminar este registro?")) return;
    let registros = JSON.parse(localStorage.getItem("activos"));
    registros.splice(index, 1);
    localStorage.setItem("activos", JSON.stringify(registros));
    cargar();
}



function imprimirTabla() {
    const contenido = document.querySelector("table").outerHTML;

    const ventana = window.open("", "", "width=900,height=700");
    ventana.document.write(`
        <html>
        <head>
            <title>Movimiento de Activos Fijos</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h1 { text-align: center; }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 6px;
                    text-align: center;
                }
                th {
                    background: #eee;
                }
            </style>
        </head>
        <body>
            <h1>Movimiento de Activos Fijos</h1>
            ${contenido}
        </body>
        </html>
    `);

    ventana.document.close();
    ventana.print();
}
function guardarArchivo() {
    let registros = JSON.parse(localStorage.getItem("activos")) || [];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registros));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "activos.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
}
function cargarArchivo(event) {
    const archivo = event.target.files[0];
    const lector = new FileReader();
    lector.onload = function(e) {
        const registros = JSON.parse(e.target.result);
        localStorage.setItem("activos", JSON.stringify(registros));
        cargar();
    };
    lector.readAsText(archivo);
}
