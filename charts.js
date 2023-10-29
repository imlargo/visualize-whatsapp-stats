
//Retorna -- un solo color si no se da argumentos -- o un array de colores del tamaño q le especifiquemos 
function getColor(color = false) {
    if (color) {
        //Si se le dice cuantos colores, regresa una lista de colores
        const colors = []
        for (let i = 0; i < color; i++) {
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color = color + ("0123456789ABCDEF")[Math.floor(Math.random() * 16)];
            }
            colors.push(color)
        }
        return colors
    } else {
        //Si no se le da ningun parametro a la funcion, regresa un solo color
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color = color + ("0123456789ABCDEF")[Math.floor(Math.random() * 16)];
        }
        return color
    }
}



function addElements(tipo) {
    document.getElementById("tlGrafico").textContent = `Datos ${tipo}`;

    const elemento = document.getElementById("grafica")
    elemento.remove();

    const newCanvas = document.createElement("canvas");
    newCanvas.id = "grafica"

    document.getElementById("DivGraficos").appendChild(newCanvas);
}

function AddGraph(label, axis) {
    addElements(label);
    //Etiquetas Unicas ordenadas
    const tempData = contarMensajes(bigData);

    console.log(tempData);
    
    const tagsOrdenadas = Object.keys(tempData);
    //Inicio la busqueda por Clave y cuento totales por año
    const Conteos = tagsOrdenadas.map(telefono => tempData[telefono]);
    
    //Configurar etiquetas y datos
    const datax = {
        labels: tagsOrdenadas,
        datasets: [{
            label: label,
            backgroundColor: getColor(tagsOrdenadas.lenght),
            borderColor: 'rgb(255, 99, 132)',
            data: Conteos,
        }]
    };

    const config = {
        type: 'bar',
        data: datax,
        options: {
            indexAxis: axis,
        }
    };
    ChartPrincipal = new Chart(
        document.getElementById('grafica'),
        config
    );
}

function añadirGrafico(element) {
    AddGraph(
        element.getAttribute("label"),
        element.getAttribute("axis")
    );
}


