
import express from "express";
import ProductManager from "./index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 8080;
const PATH = "./DesafioEntregable3/src/products.json";
const products = new ProductManager(PATH);

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);

    if (limit) {
        const allProducts = await products.getProducts();
        const queryLimit = allProducts.slice(0, limit);
        return res.send(queryLimit);
    } else {
        return res.send(await products.getProducts());
    }
});

app.get("/products/:pid", async (req, res) => {
    let prodID = parseInt(req.params.pid);

    const allProducts = await products.getProducts();

    let productSelected = allProducts.find((prod) => prod.id === prodID);

    res.send(productSelected);
});

app.listen(port, () => console.log("OK"));
