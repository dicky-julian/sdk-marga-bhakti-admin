export const fetchResponse = (status, data, message) => {
  return {
    status: status || 400,
    data: data || null,
    message: message || "Bad Request",
  };
};
