window.onload = function () {
    const url = 'http://localhost:3000/articulos';
    const divArticulos = document.getElementById('divArticulos');
    const btnNuevo = document.getElementById('btnNuevo');
    const modal = document.getElementById('dialogNuevo');
    const modalModificar = document.getElementById('dialogModificar');
    const form = document.getElementById('formNuevo');
    const formModificar = document.getElementById('formModificar');

    const pintaArticulos = (articulos) => {
        let html = `
            <table style="border: solid 2px black;">
            <thead>
                <tr style="border: solid 2px black;">
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Precio</td>
                </tr>
            </thead>
            <tbody>
        `;
        articulos.forEach(articulo => {
            html += `
                <tr>
                    <td style="border: solid 2px black;">${articulo.id}</td>
                    <td style="border: solid 2px black;">${articulo.nombre}</td>
                    <td style="border: solid 2px black;">${articulo.precio}</td>
                    <td><button value = "${articulo.id}" class = "modificar btn btn-success">Modificar</button></td>
                    <td><button value = "${articulo.id}" class = "eliminar btn btn-danger">Eliminar</button></td>
                </tr>
            `;
        });
        html += `</tbody></table>`;
        divArticulos.innerHTML = html;

        let modBtns = document.querySelectorAll('.modificar');
        modBtns.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.value;
                getArticulo(id);
            });
        });

        let deleteBtns = document.querySelectorAll('.eliminar');
        deleteBtns.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.value;
                deleteArticulo(id);
            });
        });
    };
    const pintaArticulo = (articulo) => {
        modalModificar.showModal();
        formModificar.id.value = articulo.id;
        formModificar.nombre.value = articulo.nombre;
        formModificar.precio.value = articulo.precio;
    }
    const getArticulos = () => {
        fetch(url)
            .then(response => response.json())
            .then(articulos => pintaArticulos(articulos))
            .catch(error => console.error('Error al obtener los artículos:', error));
    };
    const getArticulo = (id) => {
        fetch(url + '/' + id)
            .then(response => response.json())
            .then(articulo => pintaArticulo(articulo))
            .catch(error => console.error('Error al obtener el artículo', error))
    }

    const addArticulo = () => {

        let id = form.id.value;
        let nombre = form.nombre.value;
        let precio = form.precio.value;

        const nuevoArticulo = JSON.stringify({ id, nombre, precio });
        const opciones = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: nuevoArticulo,
        };

        fetch(url, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(() => {
                alert('Nuevo artículo creado con éxito!');
                getArticulos();
                modal.close();
            })
            .catch(error => console.error('Error al añadir el artículo:', error));
    };
    const modArticulo = () => {

        let id = formModificar.id.value;
        let nombre = formModificar.nombre.value;
        let precio = formModificar.precio.value;

        const modArticulo = JSON.stringify({ id, nombre, precio });
        const opciones = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: modArticulo,
        };

        fetch(url + "/" + id, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(() => {
                alert('Nuevo artículo ACTUALIZADO con éxito!');
                getArticulos();
                modalModificar.close();
            })
            .catch(error => console.error('Error al añadir el artículo:', error));
    };
    const deleteArticulo = (id) => {

        fetch(url + "/" + id, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(() => {
                alert('Nuevo artículo BORRADO con éxito!');
                getArticulos();
            })
            .catch(error => console.error('Error al añadir el artículo:', error));
    };


    btnNuevo.addEventListener('click', () => modal.showModal());
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addArticulo()
    });
    formModificar.addEventListener('submit', (event) => {
        event.preventDefault();
        modArticulo();
    });

    getArticulos();


};
