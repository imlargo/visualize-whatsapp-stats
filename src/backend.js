function extraerInformacion(rawText) {
    try {
        const texto = rawText.replaceAll(" ", " ")
        // Expresión regular para extraer la fecha y la hora
        const fechaHoraRegex = /^(.+) - /;
        const fechaHoraMatch = texto.match(fechaHoraRegex);
        const fechaHora = fechaHoraMatch ? fechaHoraMatch[1].split(", ") : "null";
        const fecha = fechaHora[0]
        const hora = fechaHora[1]

        // Expresión regular para extraer el número de teléfono
        const telefonoRegex = /\. m\. - (.+): /;
        const telefonoMatch = texto.match(telefonoRegex);
        const telefono = telefonoMatch ? telefonoMatch[1] : "null";

        // Expresión regular para textraer el mensaje de texto
        const mensajeRegex = /: (.+)$/;
        const mensajeMatch = texto.match(mensajeRegex);
        const mensaje = mensajeMatch ? mensajeMatch[1] : "null";

        return {
            fecha,
            hora,
            telefono,
            mensaje,
        };
    } catch (error) {
        return null
    }

}

function obtenerTopNValores(diccionario, n) {
    const matrizClaveValor = Object.entries(diccionario);

    matrizClaveValor.sort((a, b) => b[1] - a[1]);

    const subDiccionario = {};
    for (let i = 0; i < n && i < matrizClaveValor.length; i++) {
        const [clave, valor] = matrizClaveValor[i];
        subDiccionario[clave] = valor;
    }

    return subDiccionario;
}


function loadData(rawText) {
    const mensajes = rawText.split("\n")
    const rawData = mensajes.map((msg) => extraerInformacion(msg))
    const data = rawData.filter(msg => msg != null)
    return data;
}

function contarMensajes(data) {
    const Objeto = {};
    for (const msg of data) {
        console.log(msg)
        const telefono = msg.telefono;
        Objeto[telefono] = (Objeto[telefono] || 1) + 1;
    }

    return obtenerTopNValores(Objeto, 30);;
}
