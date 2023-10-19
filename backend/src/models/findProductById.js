const connection = require('./connection');

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = findProductById;