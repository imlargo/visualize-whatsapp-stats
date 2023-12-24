const dataFunctions = {
    "contarMensaje" : (bigData) => {
        const Objeto = {};
        for (const msg of bigData) {
            const telefono = msg.telefono;
            Objeto[telefono] = (Objeto[telefono] || 1) + 1;
        }
    
        return obtenerTopNValores(Objeto, 30);
    },

    "contarFecha" : (bigData) => {
        const Objeto = {};
        for (const msg of bigData) {
            const fecha = msg.fecha;
            Objeto[fecha] = (Objeto[fecha] || 1) + 1;
        }
    
        return obtenerTopNValores(Objeto, 30);
    },

    "contarHora" : (bigData) => {
        const Objeto = {};
        for (const msg of bigData) {
            const hora = msg.hora;
            Objeto[hora] = (Objeto[hora] || 1) + 1;
        }
    
        return obtenerTopNValores(Objeto, 26);
    },

    "contarMultimedia" : (bigData) => {
        const filtrado = bigData.filter(msg => msg.mensaje == "<Multimedia omitido>")
        const Objeto = {};
        for (const msg of filtrado) {
            const telefono = msg.telefono;
            Objeto[telefono] = (Objeto[telefono] || 1) + 1;
        }
    
        return obtenerTopNValores(Objeto, 30);
    },

    "contarEmoji" : (bigData) => {
        const emojis = bigData.map(msg => getEmojis(msg.mensaje))
        console.log(emojis)
        const Objeto = {};
        for (const emoji of emojis) {
            Objeto[emoji] = (Objeto[emojis] || 1) + 1;
        }

        return obtenerTopNValores(Objeto, 30);
    }

}

function addElements(tipo) {
    document.getElementById("tlGrafico").textContent = `${tipo}`;

    const elemento = document.getElementById("grafica")
    elemento.remove();

    const newCanvas = document.createElement("canvas");
    newCanvas.id = "grafica"

    document.getElementById("graphContainer").appendChild(newCanvas);
}

function AddGraph(label, axis, type) {
    addElements(label);
    //Etiquetas Unicas ordenadas
    const tempData = (dataFunctions[type])(bigData);
    
    const tagsOrdenadas = Object.keys(tempData);
    //Inicio la busqueda por Clave y cuento totales por año
    const Conteos = tagsOrdenadas.map(key => tempData[key]);
    
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

function añadirGrafico(id) {
    const element = document.getElementById(id);
    AddGraph(
        element.getAttribute("label"),
        element.getAttribute("axis"),
        element.getAttribute("id")
    );
}


