# API Requirements
FrontStore API in Node.js
Database Schema and Endpoints

## API Endpoints

### `Postman API Documentaion`
https://documenter.getpostman.com/view/15765892/VUjSG3v4#9e39e488-bfc1-4c76-aace-709fd1aca8ae

#### Products
- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create (args: Product): `'products/' [POST]`
- [OPTIONAL] Top 5 most popular products `'five-most-expensive/ [GET]`
- [ADDED] Delete: `'products/:id  [DELETE]`

#### Users
- Index: `'users/' [GET] (token)` [token required]
- Show: `'users/:id' [GET] (token)` [token required for same user :id]
- Update: `'users/:id' [PUT] (token)` [token required for same user :id]
- Delete : `'users/:id' [DELETE] (token)` [token required for same user :id]

#### Auth
- Login (args: Email, Password): `'login/' [POST]`
- Register: `'register/' [POST]` (email, password, name)
- Auth `'auth/' [POST]` [token required]

#### Orders
- Index: `'orders/' [GET] (token)`
- Create [token required] (args: Status (open OR close), user_id): `'orders/' [POST] (token)`
- Add Product [token required] (args: product_id, quantity): `'orders/:order_id/products/' [POST] (token)`
- Update Order Status [token required] (args: status (open OR Close)): `'orders/:order_id/update_status/' [PUT] (token)`

#### Dashboard Relationships
- Products: products_in_orders: `'products_in_orders/' [GET]`
- Products: products_for_specific_orders: `'products_for_order/:id/' [GET]`
- Users: users_with_orders: `'users_with_orders/' [GET]`
- Products: five-most-expensive: `'five-most-expensive/' [GET]`

## Data Shapes
#### Product
- id
- name
- price
- created_at
- updated_at

```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null])
```
#### User
- id
- name
- email
- password
- created_at
- updated_at

```
Table: User (id:serial[primary key], name:varchar(50)[not null], email:varchar(50)[not null], password:varchar(60)[not null])
```
#### Orders
- id
- quantity
- user_id
- status of order (open or close)

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer, user_id:integer(foreign key to users table), status:varchar(50)[not null])
```
#### order_products
- id
- quantity
- order_id
- product_id

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[not null], order_id:integer(foreign key to orders table)[not null])
```
## .env file
You Can see .env.example file in the root of the project added with default .env config but with out secure values that will change from user or device to another that you can add
#### PORT

== APP CONFIGURATION ===
-
- PORT=3000 [EXAMPLE]
- ENV=dev [SET WITH TEST OR DEV] (Will be test by default while testing)

== POSTGRES DATABASE CONFIGURATION ==
-
- POSTGRES_HOST=127.0.0.1 [EXAMPLE]
- POSTGRES_DB=store [EXAMPLE]
- POSTGRES_DB_TEST=store_test [EXAMPLE]
- POSTGRES_USER=postgres [EXAMPLE]
- POSTGRES_PASSWORD=123456789 [EXAMPLE]

== JWT CONFIGURATION ==
-
- BCRYPT_PASSWORD=speak-friend-and-enter [EXAMPLE]
- SALT_ROUNDS=10 [EXAMPLE]
- TOKEN_SECRET=jwt-secret-123456789 [EXAMPLE]

