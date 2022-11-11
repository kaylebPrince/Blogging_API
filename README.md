# Blogging App
This is an api for a blogging app

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get blog posts
5. Users should be able to create blog posts
6. Users should be able to update and delete blog posts
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `node app.js`

---
## Base URL
- cyclic.sh


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |


### Order
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | number  |  required,default:1|
|  total_price  |  number |  required  |
|  items     | array  |  required |
|  item.name |   string |  required  |
|  item.price |  number |  required |
|  item.size |  string |  required, enum: ['m', 's', 'l'] |
|  item.quantity |  number |  required, enum: ['m', 's', 'l'] |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": "joe@example.com"
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'vjsinewobfsgje'
}
```

---
### Create blogPost

- Route: /newPost
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  
}
```

- Responses

Success
```
{
    
}
```
---
### Get blogPosts

- Route: /blogs
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
   

```
---

### Get blogPost

- Route: /:id
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

...

## Contributor
- Prince Caleb Agarah