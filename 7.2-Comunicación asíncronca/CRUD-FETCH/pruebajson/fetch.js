let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
fetch('http://localhost:8080/prueba', options)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error al procesar la respuesta:', error));
