Here we continue the middleware understanding by adding two new middlewares
One for log the request details
Another one to intercept the requests and look for the authorization paramether.
If it does not exit, the request if finished with a 403 HTTP status code.
