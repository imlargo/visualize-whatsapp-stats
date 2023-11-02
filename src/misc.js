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

function roundHora(raw) {
    const regexHora = /(.+):/;
    const regexFormato = / (a\. m\.|p\. m\.)/
    const hora = raw.match(regexHora)[1];
    const formato = raw.match(regexFormato)[1];
    
    return `${hora}:00 ${formato}`
}

function getEmojis(raw) {
  return raw.match(/[\p{Emoji}\u200d]+/gu)[1] || [];
}