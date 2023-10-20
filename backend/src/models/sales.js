const connection = require('./connection');

const findAllSales = async () => {
  const [allSales] = await connection.execute(`
  SELECT
  t1.sale_id AS saleId,
  t3.date,
  t2.id AS productId,
  t1.quantity
FROM sales_products AS t1
  INNER JOIN products AS t2 ON t1.product_id = t2.id
  INNER JOIN sales AS t3 ON t1.sale_id = t3.id
  ORDER BY t1.sale_id, t2.id;`);
  return allSales;
};

const findSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
  t3.date,
  t2.id AS productId,
  t1.quantity
FROM sales_products AS t1
  INNER JOIN products AS t2 ON t1.product_id = t2.id
  INNER JOIN sales AS t3 ON t1.sale_id = t3.id
  WHERE sale_id = ?;`,
    [id],
  );
  return sale;
};

module.exports = {
  findAllSales,
  findSalesById,
};