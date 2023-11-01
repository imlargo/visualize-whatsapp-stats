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
