# Project Name

## Description

App to manage comunication between providers and stores.

## User Stories

- **404** - As a user I want to see a 404 page if I try to enter a page that doesn't exist.
- **403** - As a User I want to see a 403 page if I try to enter a page without having the appropiate permissions to do it. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I can login
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

### Roles

- Provider: User that provides for all the stores.
- Store owner: User in charge of confirming orders and creating Store user

### Admin

- **Store list** - As an Provider I want to a list of all the stores that I manage and provide for.
- **Create store** - As an Provider I want to be able to create new stores
- **Order list** - As an Provider I want to be able to list the orders created by the stores.
- **Filter orders** - As an Provider I want to be able to filter the orders depending on its status.
- **Change order status** - As an Provider I want to be able to change the order status.
- **Product list** - As an Provider I want to be able to list all my products.
- **Search Product** - As an Provider I want to be able to search for a product.
- **Create product** - As an Provider I want to be able to create new products.
- **Update product** - As an Provider I want to be able to change the details of a product.
- **Delete product** - As an Provider I want to be able to delete a produc fromn my list of products.
- **Product details** - As an Provider I want to be able to see the information about a product.


### Store Owner

- **Product list** - As a Store Owner I want to see a list of the different products.
- **Product availability** - As a Store Owner I want to have a way to know which products are available for ordering at a given time.
- **Product search** - As a Store Owner I want to be able to search for a specific product.
- **Create order** - As a Store Owner I want to be able to create orders.
- **Order list** - As a Store Owner I want to be able to see my previous orders and check their status.
- **See profile** -  As a Store Owner I want to be able to see my information.
- **Update profile** -  As a Store Owner I want to be able to modify my information details.

 
## Backlog

List of other features outside of the MVPs scope

Provider:
- can confirm orders.
- Show general statistics for the store
- Show statistics related to each store
- Use charts to show said statistics
- Add images to the products.


Store Owner:
- Be able to modify an order after creation until the admin confirms it.
- Once a Store adds a product to an order, the system can Pre-allocate it to that store for a limited time so no one else buys it first.

System:
- Add unit testing.


## ROUTES:

| Method | Route                | Description                                                                                                                                      | Role                 |
|--------|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| `GET`    | /                    | Shows the homepage                                                                                                                               | None                 |
| `POST`   | /auth/login          | Logs in to the application if the credentials are right                                                                                          | None                 |
| `GET`    | /signup              | Shows the registration form                                                                                                                      | None                 |
| `POST`   | /auth/signup         | Creates a new Store Owner and a Store in the database. Redirects the Store Owner to its dashboard if the registration has been done successfully | None                 |
| `GET`    | /dashboard           | Shows the dashboard of the storeOwner/Provider, with the menu links.                                                                             | Store Owner Provider |
| `GET`    | /products            | Shows a list of products                                                                                                                         | Provider             |
| `GET`    | /products/new        | Shows a form to create a product                                                                                                                 | Provider             |
| `POST`   | /products            | Creates a new product                                                                                                                            | Provider             |
| `GET`    | /products/:id        | Shows information about a product                                                                                                                | Store Owner Provider |
| `POST`   | /products/:id        | Updates information about a product                                                                                                              | Provider             |
| `GET`    | /products/:id/delete | Shows a deletion confirmation screen for the product                                                                                             | Provider             |
| `POST`   | /products/:id/delete | Deletes a product from the database. Deletion should be logical                                                                                  | Provider             |
| `GET`    | /api/products=?query | Returns a list of products that match the query                                                                                                  | Store Owner Provider |
| `GET`    | /stores              | Shows a list of the stores                                                                                                                       | Provider             |
| `POST`   | /stores/new          | Shows a Store creation form                                                                                                                      | Provider             |
| `GET`    | /stores/:id          | Shows information about a store.                                                                                                                 | Provider             |
| `GET`    | /profile             | Shows a Store owner information about itself and its Store                                                                                       | Store Owner Provider |
| `POST`   | /profile             | Updates the Store owner information about itself and its Store                                                                                   | Store Owner          |
| `GET`    | /orders              | Shows all the orders. Admin will see all orders created. Store will see all orders created by it                                                 | Store Owner Provider |
| `GET`    | /orders/new          | Shows a screen with a list of products to create new orders                                                                                      | Store Owner          |
| `POST`   | /orders              | Creates a new order with the products selected                                                                                                   | Store Owner          |
| `GET`    | /orders/:id          | Shows details of an order. Store can only see their own orders                                                                                   | Store Owner Provider |
| `POST`   | /orders/:id          | Changes status of an order                                                                                                                       | Provider             |
## Models

Provider model
 
```
username: String
password: String
```

Store Owner Model

```
username: String
password: String
store: { name: String, description: String, location: String }
```

Store model

```
name: String
CIF: String
description: String
location: String
timestamps
```


Order model

```
Status: Enum (pending / delivered)
Products: [
  { name: String
   price: NumberDecimal( "0.01" )
   quantity: Number}
]
Store: ObjectID(Store)
timestamps
``` 

Product model

```
Name: String
Description: String
Price: NumberDecimal( "0.01" )
Stock: Number
Deleted: boolean
```



## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/matiasferreiro/deck-1#/)