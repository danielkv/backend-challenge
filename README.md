# Backend Challenge

Backend Challenge - this project was made to test the Queues in RabbitMQ.

# Table of contents

- [Backend Challenge](#backend-challenge)
- [Table of contents](#table-of-contents)
- [How to run this project](#how-to-run-this-project)
- [Run tests](#run-tests)
- [API Documentation](#api-documentation)
	- [REST API](#rest-api)

# How to run this project

This project uses **docker** and **docker-compose** to run.

Run in the **terminal**:

```
git clone https://github.com/danielkv/backend-challenge backend-challenge
cd backend-challenge
docker-compose up
```

The **server** should run at `https://localhost:3000`

# Run tests

---

To run tests, you need to run the **RabbitMQ** and **MySQL** before. Run this code in the **terminal** in the root folder of repository:

```
docker-compose up -d mysql rabbitmq
```

**AND THEN:** \
With yarn

```
yarn test
```

With npm:

```
npm run test
```

# API Documentation

The backend was build on top of **ExpressJS** with **Typescript**.

## REST API

**Base URL**

> `https://localhost:3000/`

Find many products

```
[GET] /products
```

| Query Param | Type     | Required | Default     | Description                |
| ----------- | -------- | -------- | ----------- | -------------------------- |
| offset      | `number` | No       | `undefined` | Pagination cursor          |
| limit       | `number` | No       | `undefined` | Number of rows to retrieve |

**Response** \
The response returns 2 objects: **items** and **pageInfo**

<details>
	<summary><b>response</b>: the response from server</summary>
	<p>

    {
    	items: array of products
    	pageInfo: pagination details
    }

</p>

</details>

<details>
	<summary><b>items</b>: products list</summary>
	<p>

    items: [
    	{
            id: 1,
            name: "Angelica",
            price: 5.6,
            quantity: 0
        },
        {
            id: 2,
            name: "Savoy cabbage",
            price: 4.37,
            quantity: 0
        },
    	...
    ]

</p>

</details>
<details>
	<summary><b>pageInfo</b>: pagination details</summary>
	<p>

    pageInfo: {
    	itemsTotal: 50,
    	offset: 0,
    	limit: 10
    }

</p>

</details>
<br>

**Examples**

`[GET] /products` \
`[GET] /products?offset=0&limit=10`

---

Find 1 product

```
[GET] /products/:name
```

| Query Param | Type     | Required | Default | Description                          |
| ----------- | -------- | -------- | ------- | ------------------------------------ |
| name        | `string` | Yes      | --      | Find one product within a given name |

**Response** \
The response returns 1 object: the product object

<details>
	<summary><b>response</b>: product found</summary>
	<p>
    	
	{
		"id": 4,
		"name": "Kiwi",
		"price": 9.21,
		"quantity": 0
	}

</p>

</details>
<br>

**Example**

`[GET] /products/Kiwi`

---

**Create / Update stock** \
This endpoint creates a new products. Case the product already exists (same **name**), it will update the stock increasing or decreasing the quantity send in the body.

```
[POST] /products
```

| Body    | Type     | Required | Default | Description                               |
| ------- | -------- | -------- | ------- | ----------------------------------------- |
| product | `object` | Yes      | --      | The product object to be added or updated |

<br>

Product object

| Body     | Type     | Required | Default | Description                                                    |
| -------- | -------- | -------- | ------- | -------------------------------------------------------------- |
| name     | `string` | Yes      | --      | Product name, used to search if product exists                 |
| price    | `number` | No       | 0       | Price for the new product. It doesn't update existing products |
| quantity | `number` | No       | 1       | Product initial stock. Used to update existing products stock  |

**Response** \
The response returns 1 object: the created/updated product object

<details>
	<summary><b>response</b>: product found</summary>
	<p>
    	
	{
		"id": 4,
		"name": "Kiwi",
		"price": 9.21,
		"quantity": 3
	}

</p>

</details>
<br>

**Example**

`[POST] /products` \
body:

```
product: {
	"name": "Kiwi",
	"quantity": 3
}
```

---

Find many orders

```
[GET] /orders
```

| Query Param | Type     | Required | Default     | Description             |
| ----------- | -------- | -------- | ----------- | ----------------------- |
| offset      | `number` | No       | `undefined` | Pagination start cursor |
| limit       | `number` | No       | `undefined` | Customers per page      |

**Response** \
The response returns 2 objects: **items** and **pageInfo**

<details>
	<summary><b>response</b>: the response from server</summary>
	<p>

    {
    	items: array of customers
    	pageInfo: pagination details
    }

</p>

</details>

<details>
	<summary><b>items</b>: order list</summary>
	<p>

    items: [
    	{
            id: 1,
            total: 9.21,
            products: [
                {
                    id: 1,
                    name: "Kiwi",
                    price: 9.21,
                    quantity: 1,
                    referenceProductId: 4,
                    orderId: 1
                }
    			...
            ]
        },
    	...
    ]

</p>

</details>
<details>
	<summary><b>pageInfo</b>: pagination details</summary>
	<p>

    pageInfo: {
    	itemsTotal: 20,
    	offset: 0,
    	limit: 10
    }

</p>

</details>
<br>

**Example**

`[GET] /orders`
`[GET] /orders?offset=0&limit=10`

---

Find order by id

```
[GET] /orders/:id
```

| Param | Type     | Required | Default | Description |
| ----- | -------- | -------- | ------- | ----------- |
| id    | `number` | Yes      | --      | Order ID    |

**Response** \
The response returns 1 object: the order object

<details>
	<summary><b>response</b>: order found</summary>
	<p>
    	
	{
		products: [
			{
				name: "Kiwi",
				quantity: 2,
				referenceProductId: 4, // ID reference the product
				price: 18.42,
				orderId: 8,
				id: 8
			}
		],
		total: 18.42,
		id: 8
	}

</p>

</details>
<br>

**Example**

`GET /orders/305`

---

Create new order

```
[POST] /orders
```

| Body     | Type    | Required | Default | Description                               |
| -------- | ------- | -------- | ------- | ----------------------------------------- |
| products | `array` | Yes      | --      | The product object to be added or updated |

<br>

Products array of

| Body     | Type     | Required | Default | Description                                                   |
| -------- | -------- | -------- | ------- | ------------------------------------------------------------- |
| name     | `string` | Yes      | --      | Product name, used to search if product exists                |
| quantity | `number` | Yes      | --      | Product initial stock. Used to update existing products stock |

You can actually send the intire product object, but will not be used. These are the only fields that are usefull to create a new order

**Response** \
The response returns 1 object: the created order object

<details>
	<summary><b>response</b>: order created</summary>
	<p>
    	
	{
		id: 2,
		total: 9.21,
		products: [
			{
				id: 2,
				name: "Kiwi",
				price: 9.21,
				quantity: 1,
				referenceProductId: 4,
				orderId: 2
			}
		]
	}

</p>

</details>
<br>

**Example**

`[POST] /orders` \
body:

```
products: [
	{
		"name": "Kiwi",
		"quantity": 1
	}
]
```
