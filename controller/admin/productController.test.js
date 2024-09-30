const pool = require('../../database/connection')
const app = require('../../app')
const request = require('supertest')



beforeEach(async () => {
    await pool.query('START TRANSACTION');
})

afterEach(async () => {
    await pool.query('ROLLBACK');
})


describe('checking admin product controller if product add or not', () => {
    describe('while all credentials are given', () => {
        test('it should return res 201', async () => {
            const response = await request(app).post('/api/v1/admin/product').send({
                productName: 'productName',
                price: 299.99,
                productDescription: 'product description',
                productStockQty: 66
            })
            expect(response.statusCode).toBe(201)
            expect(response.body.message).toBe('Product successfully created')
            expect(response.body.productId).toBeDefined()
        })
        // test('while produt already exist in the database', async () => {
        //     const createProductQuery = `INSERT INTO products(productName,productDescription,price,productStockQty) VALUES (?,?,?,?)`
        //     await pool.query(createProductQuery, ['product1', 'productdesc', 239.00, 4])
        //     const response = await request(app).post('/api/v1/admin/product').send({
        //         productName: 'product1',
        //         price: 299.99,
        //         productDescription: 'product description',
        //         productStockQty: 66
        //     })
        //     expect(response.statusCode).toBe(401)
        //     expect(response.body.messsage).toBe('product already exist with this name')
        // })
    })
    describe('while all credentials are not given', () => {
        test('should return 400', async () => {
            const bodyData = [
                {},
                { productName: 'productName', price: 299, productDescription: 'product description' },
                { productStockQty: 333 }
            ]
            for (const data of bodyData) {
                const response = await request(app).post('/api/v1/admin/product').send(data)
                expect(response.statusCode).toBe(400)

            }
        })
    })
})


// describe('checking update Product', () => {
//     describe('when id and fields are given', () => {
//         test('should give status code 200', async () => {
//             const reqBody = [
//                 { productName: 'new product', id: 1 },
//                 { productDescription: 'this is updated product description from test case', id: 1 },
//                 { productStockQty: 44, id: 1 },
//                 { productName: 'newproduct', productDescription: 'updated new desc', price: 88, id: 1 }
//             ]
//             for (const data of reqBody) {
//                 const respone = await request(app).post('/api/v1/admin/product').query({ data })
//                 expect(respone.statusCode).toBe(200)
//             }
//         })
//     })
//     describe('when id and fields are not given', () => {
//         test(' give status code 400 when any field are not pass', async () => {
//             const respone = await request(app).post('/api/v1/admin/product').send({ id: 1 })
//             expect(respone.statusCode).toBe(400)
//         })
//         test(' give status code 400 when id are not pass', async () => {
//             const respone = await request(app).post('/api/v1/admin/product').send({ productName: 'new product' })
//             expect(respone.statusCode).toBe(400)
//         })
//     })
// })