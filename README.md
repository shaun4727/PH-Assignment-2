# Post: /api/products

This api stores products which is book in this case. returns newly created product.
If there is error it will return Error.

# GET: /api/products

This api gets all products in an array.

# GET: /api/products/:productId

This api will return specific product using productId.

# PUT: /api/products/:productId

this api will update a product using productId. We have to send updated product JSON.

# DELETE: /api/products/:productId

this api will remove product using productId.

# POST: /api/orders

this api will place an order and update quantity in book collection .

# GET: /api/orders/revenue

this api will calculate total revenue by multiplying quantity and price.

# instruction to setup the project locally

This repository is currently public. To setup this project locally follow the instruction
given below -

1. clone the repository
2. move into project directory
3. create an .env which must contain -
    1. PORT (in which port you want to run the project)
    2. HOSTNAME (provide a hostname like '127.0.0.1')
    3. DATABASE_URL (provide mongodb connection string with database name)
4. run npm install
5. npm run build ( run this command)
6. npm start (to start the server locally)

Now, project setup is done. Hit the api described above to get the expected result.
