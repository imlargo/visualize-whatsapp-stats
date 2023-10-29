function extraerInformacion(rawText) {
    try {
        const texto = rawText.replaceAll(" ", " ")
        // Expresión regular para extraer la fecha y la hora
        const fechaHoraRegex = /^(.+) - /;
        const fechaHoraMatch = texto.match(fechaHoraRegex);
        const fechaHora = fechaHoraMatch ? fechaHoraMatch[1].split(", ") : null;
        const fecha = fechaHora[0]
        const hora = fechaHora[1]

        // Expresión regular para extraer el número de teléfono
        const telefonoRegex = /\. m\. - (.+):/;
        const telefonoMatch = texto.match(telefonoRegex);
        const telefono = telefonoMatch ? telefonoMatch[1] : null;

        // Expresión regular para textraer el mensaje de texto
        const mensajeRegex = /: (.+)$/;
        const mensajeMatch = texto.match(mensajeRegex);
        const mensaje = mensajeMatch ? mensajeMatch[1] : null;

        return {
            fecha,
            hora,
            telefono,
            mensaje,
        };
    } catch (error) {
        return {
            fecha : "Null",
            hora : "Null",
            telefono : "Null",
            mensaje : "Null",
        };
    }

}


function loadData(rawText) {
    const mensajes = rawText.split("\n")   
    const data = mensajes.map((msg) => extraerInformacion(msg))
    return data;
}


function contarMensajes(data) {
    const Objeto = {};
    for (const msg of data) {
        console.log(msg)
        const telefono = msg.telefono;
        Objeto[telefono] = (Objeto[telefono] || 1) + 1;
    }
    return Objeto;
}
