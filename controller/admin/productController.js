const pool = require("../../database/connection")

const addProduct = async (req, res) => {
    const { productName, price, productDescription, productStockQty } = req.body;

    if (!productName || !price || !productDescription || !productStockQty) {
        return res.status(400).json({
            message: 'Please provide all the fields',
        });
    }

    try {
        // Uncomment this if you want to create the table dynamically
        // const createTable = `
        // CREATE TABLE IF NOT EXISTS products (
        //   id INT PRIMARY KEY AUTO_INCREMENT,
        //   productName VARCHAR(255) NOT NULL,
        //   price FLOAT NOT NULL,
        //   productStockQty INT NOT NULL,
        //   productDescription TEXT NOT NULL,
        //   created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //   updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        // )`;
        // await pool.query(createTable);

        // Check if the product already exists
        // const isProductExistQUERY = `SELECT * FROM products WHERE productName = ?`;
        // const [isProductExist] = await pool.query(isProductExistQUERY, [productName]);

        // if (isProductExist.length > 0) {
        //     return res.status(401).json({
        //         message: 'Product already exists with this name',
        //     });
        // }

        // Insert the new product into the database
        const productInsertQuery = `
        INSERT INTO products(productName, price, productDescription, productStockQty) VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.query(productInsertQuery, [productName, price, productDescription, productStockQty]);

        return res.status(201).json({
            message: 'Product successfully created',
            productId: result.insertId,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};


// const updateProduct = async (req, res) => {
//     const { id } = req.params
//     const { productName, price, productStockQty, productDescription } = req.body
//     console.log(req.body)
//     if (!id) {
//         return res.status(400).json({
//             message: 'please send id'
//         })
//     }
//     if (!productName && !price && !productStockQty && !productDescription) {
//         return res.status(400).json({
//             message: 'please send altest onfield to update'
//         })
//     }
//     let updateFields = [];
//     let queryParams = [];

//     if (productName) {
//         updateFields.push('productName = ?');
//         queryParams.push(productName);
//     }
//     if (price) {
//         updateFields.push('price = ?');
//         queryParams.push(price);
//     }
//     if (productStockQty) {
//         updateFields.push('productStockQty = ?');
//         queryParams.push(productStockQty);
//     }
//     if (productDescription) {
//         updateFields.push('productDescription = ?');
//         queryParams.push(productDescription);
//     }
//     queryParams.push(id);
//     const productUpdateQuery = `
//             UPDATE products 
//             SET ${updateFields.join(', ')} 
//             WHERE id = ?
//         `;
//     try {
//         const [reasult] = await pool.query(productUpdateQuery, queryParams)
//         if (reasult.affectedRows === 0) {
//             return res.status(500).json({
//                 message: 'Failed to update the product',
//             });
//         }
//         return res.status(200).json(
//             {
//                 message: 'successfully update product',
//             }
//         )

//     } catch (error) {
//         return res.status(500).json(
//             {
//                 message: 'internal server error',
//             }
//         )
//     }
// }

module.exports = {
    addProduct,
    // updateProduct
}