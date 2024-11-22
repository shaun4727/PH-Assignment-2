# Post: /api/products

This api stores products which is book in this case. returns newly created product.
If there is error it will return Error.

# GET: /api/products

This api gets all products in an array.

# GET: /api/products/:productId

This api will return specific product. ProductId will return product.

# PUT: /api/products/:productId

this api will update a product with product id. We have to send updated product JSON.

# DELETE: /api/products/:productId

this api will remove product with id.

# POST: /api/orders

this api will place an order and update book collection.

# GET: /api/orders/revenue

this api will calculate total revenue by multiplying quantity and price.
