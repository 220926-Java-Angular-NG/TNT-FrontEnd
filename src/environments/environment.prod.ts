export const environment = {
  production: false,
  withCredentials: true,
  // baseUrl: "http://localhost:8080",
  baseUrl: "http://ec2-54-146-255-45.compute-1.amazonaws.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://tntfrontendrev.s3-website-us-east-1.amazonaws.com',
    'Authorization': 'Bearer '
  }
};
