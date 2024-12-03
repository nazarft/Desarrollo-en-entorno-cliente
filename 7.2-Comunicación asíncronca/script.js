window.onload = () => {
    const addModal = document.getElementById('miDialogo');
    const addBtn = document.querySelector('.addButton');
    const createBtn = document.getElementById('createBtn');
    const eliminarBtn = document.querySelector('.eliminar');

    const idArticulo = document.querySelector('.id');
    const nombreArticulo = document.querySelector('.nombre');
    const precioArticulo = document.querySelector('.precio');

    const articulosDiv = document.querySelector('.articulos');

    const url = 'http://localhost:3000/articulos';
    const getArticulos = () => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en artículos  ${response.status} ${response.statusText}`)
                }
                return response.json();
            })
            .then(articulos => {
                let html = `
                    <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                    `
                articulos.forEach(articulo => {
                    html += `
                        <tr>
                        <td>${articulo.id}</td>
                        <td>${articulo.nombre}</td>
                        <td>${articulo.precio}</td>
                        <td><button  class="modificar">Modificar</button value="${articulo.id}"></td>
                        <td><button value = "${articulo.id}" class="eliminar">Eliminar</button></td>
                    </tr>
                        `;
                });
                articulosDiv.innerHTML = html;

                let eliminarBtn = document.querySelectorAll('.eliminar');
                eliminarBtn.forEach(btn => {
                    btn.addEventListener('click', deleteArticulo);
                });
            });
    }
    const addArticulo = (event) => {
        event.preventDefault();
        const id = idArticulo.value;
        const nombre = nombreArticulo.value;
        const precio = precioArticulo.value;

        let nuevoArticulo = JSON.stringify({ "id": id, "nombre": nombre, "precio": precio });
        let opciones = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: nuevoArticulo
        }
        fetch(url, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Mi ERROR ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(articulo => {
                console.log(articulo);
                getArticulos();
                addModal.close();
            });
    }
    const deleteArticulo = (event) => {
        event.preventDefault();
        const id = event.target.value;
        let opciones = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url + '/' + id, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Mi ERROR ${response.status} ${response.statusText}`);
                }
                alert(`Artículo con ID ${id} eliminado`);
                getArticulos();
            });
    }
    getArticulos();
    createBtn.addEventListener('click', addArticulo);
    addBtn.addEventListener('click', () => { addModal.showModal() })
}
