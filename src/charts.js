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
        // Extraer todos los emojis de los mensajes y guardarlos en un array
        const allEmojis = bigData.flatMap(
            msg => msg.mensaje.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []
        );
        // Contar cuantas veces se repite cada emoji
        const Objeto = {};
        for (const emoji of allEmojis) {
            Objeto[emoji] = (Objeto[emoji] || 1) + 1;
        }
        return obtenerTopNValores(Objeto, 20);
    },

    "contarPalabra" : (bigData) => {
        const allWords = bigData.flatMap(
            msg => msg.mensaje.split(/,| /)
                .map(word => ((word.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '')).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
                .filter(Boolean)
                .filter(word => word.length > 3 && word != "<multimedia" && word != "omitido>")
        );

        // Contar cuantas veces se repite cada palabra
        const Objeto = {};
        for (const word of allWords) {
            Objeto[word] = (Objeto[word] || 1) + 1;
        }

        return obtenerTopNValores(Objeto, 15);
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


