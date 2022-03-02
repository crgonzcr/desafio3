const express = require("express");
const Container = require("./container")

const container = new Container('productos.txt');
const app = express();
const PORT = 8080;

app.listen(PORT);

let response = {
	message: []
}

app.get("/productos", async (req, res) => {
	let product = await container.getAll()
	response.message = product
	res.status(200).json(response.message);
});

app.get("/productoRandom", async (req, res) => {
	let product = await container.getAll()
	let randomProduct = product[Math.floor(Math.random() * product.length)];
	response.message = randomProduct
	res.status(200).json(response.message);

});
