const fs = require('fs');

class Container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(productData) {
        try {
            let arrayProducts = []
            let id;

            if(!fs.existsSync(`./${this.fileName}`)) {
                await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([{id:1, ...productData}]));
            }

            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            console.log(data.length);
            if (data.length !== 0) {
                data = JSON.parse(data)
                id = Math.max.apply(Math, data.map(function(o) { return o.id; })) + 1;
            } else {
                id = 1
            }

            arrayProducts = [...data, {id, ...productData}];

            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arrayProducts));

            return id
        } catch (error) {
            console.error(error);
        }
    }
    
    async getById(id) {
        try {
            if(!fs.existsSync(`./${this.fileName}`)) {
                return 'El archivo no existe';
            }

            if (typeof id !== 'number') {
                return 'El id ingresado no es un numero';
            }
            
            if (id <= 0) {
                return 'El id ingresado debe ser mayor a 0';
            }

            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            if (data.length === 0 || data === '') {
                return 'El archivo esta vacio';
            }
            
            data = JSON.parse(data);
            const indexProduct = data.findIndex((product) => {return product.id === id});

            if (indexProduct === -1) {
                return null;
            }
            return data[indexProduct]
        } catch (error) {
            console.error(error);
        }

    }
    
    async getAll() {
        try {
            if(!fs.existsSync(`./${this.fileName}`)) {
                return 'El archivo no existe';
            }

            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            if (data.length === 0 || data === '') {
                return 'El archivo esta vacio';
            }
            
            data = JSON.parse(data);

            return data
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteById(id) {
        try {
            if(!fs.existsSync(`./${this.fileName}`)) {
                return 'El archivo no existe';
            }

            if (typeof id !== 'number') {
                return 'El id ingresado no es un numero';
            }
            
            if (id <= 0) {
                return 'El id ingresado debe ser mayor a 0';
            }

            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            if (data.length === 0 || data === '') {
                return 'El archivo esta vacio';
            }
            
            data = JSON.parse(data);
            const indexProduct = data.findIndex((product) => {return product.id === id});

            if (indexProduct === -1) {
                return 'El producto no existe'
            }
            data.splice(indexProduct, 1)

            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAll() {
        try {
            if(!fs.existsSync(`./${this.fileName}`)) {
                return 'El archivo no existe';
            }

            await fs.promises.writeFile(`./${this.fileName}`, '')
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Container

