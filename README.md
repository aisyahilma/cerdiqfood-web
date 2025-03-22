# Cerdiq Food

[Cerdiq Food](https://cerdiqfood.com) is an online store for fresh farm produce and frozen food.

## Links

- Website/Frontend: <https://cerdiqfood.com>
  - Backend: <https://api.cerdiqfood.com>
- Repositories:
  - General: <ttps://github.com/aisyahilma/cerdiqfood>
  - Frontend: <https://github.com/aisyahilma/cerdiqfood-web>
  - Backend: <ttps://github.com/aisyahilma/cerdiqfood-api>

Inspirations:

- <https://shop.freshbox.id/>
- <https://www.dailybox.id/>
- <https://www.sayurbox.com/>

## Features

- Home page
  - Hero section
  - Products catalogue.
    - Example: <hhttps://sayurbox.com/product>
- Product page
  - Image
  - SKU (stock keeping unit)
  - Name
  - Price
  - Description
  - Stock availability
  - Add to cart form: quantity input & add to cart button
- Shopping cart page
  - Product items to buy
    - Image, name, price, quantity, total (price x quantity)
    - Remove product item
  - Link: continue shopping, go to products catalogue
  - Link: checkout
- Checkout page
  - Order summary
    - Product items to buy
    - Grand total of all product items to buy
  - Shipping address form
    - Name, email, phone, address, city, province, postal code, country
- Dashboard
  - Place order / transaction is being processed

## UI Designs

- Figma: <https://www.figma.com/design/TC8pwzy5HpWoFAQWJpN6IJ/amazingsafari.haidar.dev>

## REST API Endpoints

- Production: `https://www.figma.com/design/73GuzBkdlfqEcPVbayCuhR/Cerdiq-Food-e-commerce?node-id=0-1&m=dev&t=Udb76xts085BlITy-1`
- Local: `http://localhost:3000`

| Endpoint          | HTTP     | Description          |
| ----------------- | -------- | -------------------- |
| `/products`       | `GET`    | Get all products     |
| `/products/:slug` | `GET`    | Get product by slug  |
| `/products`       | `POST`   | Add new product      |
| `/products/:id`   | `DELETE` | Delete product by id |
| `/products/:id`   | `PUT`    | Update product by id |

More endpoints later.

### Product

```json
{
  "id": "ULID123",
  "name": "Fresh Organic Spinach",
  "price": 5000
}
```

### Add New Product

Request Body:

```json
{
  "name": "Fresh Organic Spinach",
  "price": 5000
}
```

Response Body:

```json
{
  "id": "ULID123",
  "name": "Fresh Organic Spinach",
  "price": 5000
}
```
