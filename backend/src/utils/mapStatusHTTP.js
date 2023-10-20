const HTTPCodeStatus = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const mapStatusHTTP = (status) => HTTPCodeStatus[status] || 500;

module.exports = mapStatusHTTP;
