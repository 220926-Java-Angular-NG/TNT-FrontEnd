export const environment = {
  production: false,
  withCredentials: true,
  baseUrl: "http://localhost:8080",
  // baseUrl: "http://ec2-54-205-23-209.compute-1.amazonaws.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Authorization': 'Bearer '
  }
};
