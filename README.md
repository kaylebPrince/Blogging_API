# Blogging App
This is an api for a blogging app

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT and expire the token after 1 hour
3. Implement basic auth
4. User should be able to get blog posts
5. Logged in users should be able to create blog posts
6. Logged in users should be able to update blog posts
7. Test application
8. A blog can be in two states; draft and published
9. Logged in and not logged in users should be able to get a list of published blogs created
10. Logged in and not logged in users should be able to to get a published blog
11. When a blog is created, it is in draft state
12. The owner of the blog should be able to update the state of the blog to published
13. The owner of a blog should be able to edit the blog in draft or published state
14.  The owner of the blog should be able to delete the blog in draft or published state
15. The owner of the blog should be able to get a list of their blogs.
16. The endpoint should be paginated
17. It should be filterable by state
18. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
19. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated:
20. default it to 20 blogs per page.
21. It should also be searchable by author, title and tags.
22. It should also be orderable by read_count, reading_time and timestamp
23. When a single blog is requested, the api should return the user information (the author) with the blog. The read_count of the blog too should be updated by 1
24. Come up with any algorithm for calculating the reading_time of the blog.
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
| field      |  data_type | constraints       |
|------------|------------|-------------------|
|  id        | string     |  required         |             |
|  firstname | string     |  required         |
|  lastname  | string     |  required         |
|  email     | string     |  required, unique |
|  password  | string     |  required         |
|  username  | string     |  required, unique |


### Blog
| field        | data_type  | constraints                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| title        | string     | required, unique                                         |
| description  | string     | optional                                                 |
| author       | ref - User |                                                          |
| owner        | string     |                                                          |
| state        | string     | required, default: 'draft', enum: ['draft', 'published'] |
| read_count   | Number     | default: 0                                               |
| reading_time | Number     |                                                          |
| tags         | array      | optional                                                 |
| body         | string     | required                                                 |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "kaylebprince@gmail.com",
  "password": "Caleb123",
  "firstname": "Caleb",
  "lastname": "Agarah"
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "kaylebprince@gmail.com",
        "password": "Caleb123",
        "firstname": "Caleb",
        "lastname": "Agarah",
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
  "password": "Caleb123",
  "email": "kaylebprince@gmail.com"
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
    - Authorization: cookie {token}
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
    - Authorization: cookie {token}
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
    - Authorization: cookie {token}
- Responses

Success
```
{

}
```
---

...

## Contributor
- Prince Caleb Agarah