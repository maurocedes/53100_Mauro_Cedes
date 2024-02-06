import { error } from "console";
import fs from "fs";

class ProductManager {

    constructor(PATH, products = []) {

        this.products = products
        this.PATH = PATH

    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (title, description, price, thumbnail, code, stock) {

            if (!this.products.some((prod) => prod.code === code)) {
                const product = {
                    id: this.generateID(),
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                this.products.push(product)
                await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, null))

            } else console.log("Ya existe un producto con este código. Por favor elija otro")

        } else {
            console.log("Complete todos los campos de los productos");
        }

    }

    generateID() {
        let id = 0
        if (this.products.length === 0) {
            id = 1
        } else {
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }

    getProducts = async () => {
        let data = await fs.promises.readFile(this.PATH, "utf-8")
        let products = JSON.parse(data)
        return products

    }

    getProductById = async (id) => {

        let productsData = JSON.parse(await fs.promises.readFile(this.PATH, "utf-8"))
        let productFinded = await productsData.find((prod) => prod.id === id)

        if (!productFinded) {
            return console.log("Not found")
        }
        return productFinded

    }

    updateProduct = async (id, campo, valor) => {

        let isIdValid = this.products.some(prod => prod.id === id)

        if (isIdValid) {

            let productToUpdate = this.products.find((prod) => prod.id === id)

            let productToUpdateKeys = Object.keys(productToUpdate)


            if (productToUpdateKeys.includes(campo)) {

                productToUpdate[campo] = valor

                let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(this.products))

                return listUpdated

            } else {

                productToUpdate[campo] = valor

                let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(this.products))

                return listUpdated

            }
        } else {
            console.log("El id ingresado no existe");
        }
    }

    deleteProduct = async (id) => {
        let isIdValid = this.products.some(prod => prod.id === id)

        if (isIdValid) {

            let data = await fs.promises.readFile(this.PATH, "utf-8")

            let products = JSON.parse(data)

            let productToDelete = products.find((prod) => prod.id === id)

            let productToDeleteIndex = await products.findIndex((prod) => prod.id === id)

            let newProducts = products.splice((productToDeleteIndex), 1)

            let listUpdated = fs.promises.writeFile(this.PATH, JSON.stringify(products, null))

            return products
        } else {
            console.log(`El id ${id} no existe en el documento de productos`);
        }

    }
}

const PATH = "./products.json"
const ProductHandler = new ProductManager(PATH)

await ProductHandler.addProduct("Medias Nike", "Medias Blancas 100% algodón", 1500, "./desktop/images/medias-nike-blancas", 115, 12)
await ProductHandler.addProduct("Boxer Calvin Klein", "Boxer Azul Talle M", 1500, "./desktop/images/boxer-ck-azul", 348, 3)
await ProductHandler.addProduct("Medias Nike", "Medias Negras 100% algodón", 1500, "./desktop/images/medias-nike-negras", 117, 9)
await ProductHandler.addProduct("Boxer Calvin Klein", "Boxer Rojo Talle L", 1500, "./desktop/images/boxer-ck-rojo", 341, 11)

//console.log(await ProductHandler.getProductById(4)) 
await ProductHandler.updateProduct(2, "title", "Boxer Niño")
await ProductHandler.deleteProduct(3)
console.log(await ProductHandler.getProducts())