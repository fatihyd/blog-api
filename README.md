# Blog API

A simple blog API built with Node.js, Express, and MongoDB. The API allows users to sign up, log in, create blogs, update blogs, and delete blogs. It uses JWT for authentication and authorization.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project and add your MongoDB URL and JWT secret:

```env
MONGOURL=your_mongo_url
JWTSECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## Usage

To use the API, you will need to make HTTP requests to the endpoints listed below. You can use tools like [Postman](https://www.postman.com/) to test the endpoints.

## API Endpoints

### Users

#### Sign Up a User

- **URL**: `/api/users/signup`
- **Method**: `POST`
- **Body**: (JSON)
  ```json
  {
    "username": "newuser",
    "password": "password",
    "name": "User Name"
  }
  ```

#### Log In a User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**: (JSON)
  ```json
  {
    "username": "newuser",
    "password": "password"
  }
  ```
- **Response**: (JSON)
  ```json
  {
    "token": "jwt_token",
    "username": "newuser"
  }
  ```

#### Get All Users

- **URL**: `/api/users/`
- **Method**: `GET`

### Blogs

#### Get All Blogs

- **URL**: `/api/blogs/`
- **Method**: `GET`

#### Create a New Blog

- **URL**: `/api/blogs/`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`
- **Body**: (JSON)
  ```json
  {
    "title": "My First Blog",
    "url": "http://example.com"
  }
  ```

#### Update a Blog

- **URL**: `/api/blogs/<BLOG_ID>`
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`
- **Body**: (JSON)
  ```json
  {
    "likes": 10
  }
  ```

#### Delete a Blog

- **URL**: `/api/blogs/<BLOG_ID>`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`
