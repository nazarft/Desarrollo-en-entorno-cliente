class Carrito {
	constructor(id) {
		this.id = id;
		this.articulos = [];
	}

	addToCart(articulo) {
		let articuloEnCarrito = this.articulos.find(a => a.codigo === articulo.codigo);
		if (articuloEnCarrito) {
			articuloEnCarrito.cantidad += 1;
		}
		else {
			let { codigo, nombre, genero, actor, precio } = articulo;
			this.articulos.push(
				{
					codigo,
					nombre,
					genero,
					actor,
					precio,
					cantidad: 1
				}
			);
		}
	}

	borraArticulo(codigo) {
		let articuloEncontrado = this.articulos.find(articulo => articulo.codigo === codigo);

		this.articulos.splice(this.articulos.indexOf(articuloEncontrado), 1);
	}

	modificaUnidades(codigo, n) {
		let articuloEncontrado = this.articulos.find(articulo => articulo.codigo === codigo);
		if (articuloEncontrado) {
			if (n === 1) {
				articuloEncontrado.cantidad++;
			} else if (n === -1) {
				articuloEncontrado.cantidad--;
			}
		}
	}
	verCarrito() {
		console.log(this.articulos);
	}
	getArticulos() {
		return this.articulos;
	}
}
