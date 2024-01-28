class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let productFinded = this.products.find((prod) => prod.id === id)
        if (!productFinded) {
            return console.error("Not found")
        }
        return productFinded
    }
}

const ProductHandler = new ProductManager()

ProductHandler.addProduct("Medias Nike", "Medias Blancas 100% algodón", 1500, "./desktop/images/medias-nike-blancas", 115, 12)
ProductHandler.addProduct("Boxer Calvin Klein", "Boxer Azul Talle M", 1500, "./desktop/images/boxer-ck-azul", 348, 3)

console.log("🚀 ~ ProductHandler:", ProductHandler)