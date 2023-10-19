const HTTPCodeStatus = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
};

const mapStatusHTTP = (status) => HTTPCodeStatus[status] || 500;

module.exports = mapStatusHTTP;
