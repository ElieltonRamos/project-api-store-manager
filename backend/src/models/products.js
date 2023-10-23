const connection = require('./connection');

const findAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
};

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const insertNewProduct = async (name) => {
  const [productId] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return productId.insertId;
};

const deleteProduct = async (id) => {
  const responseDB = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return responseDB[0].affectedRows;
};

module.exports = {
  findAllProducts,
  findProductById,
  insertNewProduct,
  deleteProduct,
};
