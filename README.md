# Tambula Ticket API
The Tambula Ticket API is a Node.js and MySQL based RESTful API that allows users to create and manage Tambula tickets. Tambula is a game that involves generating unique tickets with specific number patterns. This API provides endpoints for user registration, login, ticket creation, and fetching ticket lists.
<p align="center"><img src="https://img.freepik.com/free-photo/close-up-bingo-game-elements_23-2149181871.jpg?w=1060&t=st=1686083936~exp=1686084536~hmac=7cefbf462e4d79c3553b713a48895b5a523c0db107c21efcd11ec1ac67143ae8" height="400px"/> </p>
 
## Folder Structure
📁 Tambula_backend <br>
  |<br>
  |-- 📁 config<br>
  |     |-- 📄 dbConfig.js<br>
  |<br>
  |-- 📁 controllers<br>
  |     |-- 📄 authController.js<br>
  |     |-- 📄 ticketController.js<br>
  |<br>
  |-- 📁 middleware<br>
  |     |-- 📄 authentication.js<br>
  |<br>
  |-- 📁 models<br>
  |     |-- 📄 User.js<br>
  |     |-- 📄 Tickets.js<br>
  |<br>
  |-- 📁 routes<br>
  |     |-- 📄 authRoutes.js<br>
  |     |-- 📄 ticketRoutes.js<br>
  |<br>
  |-- 📁 utils<br>
  |     |-- 📄 generateTicketId.js<br>
  |<br>
  |-- 📄 .env<br>
  |-- 📄 index.js<br>
  |-- 📄 package.json<br>
  |-- 📄 README.md<br>


- "controllers" folder contains the controller files that handle the business logic of your application.
- "middleware" folder includes middleware files that provide additional functionality, such as authentication
- "models" folder holds the database models or schema definitions.
- "routes" folder contains the route files that define the API endpoints and their associated handlers.
- "utils" folder includes utility files or helper functions.
## Installation and Setup

1. Clone this project repository.
2. Install Node.js and MySQL if not already installed.
3. Install project dependencies using npm or yarn.
3. Configure the database connection settings in the ..env file.
4. Start the server and access the application.

## Database schema

This **userDB** database comprises two essential tables: **users** and **tickets**. The **users** table serves as a central component for user registration and authentication, facilitating the signup and login processes. It stores crucial user information, including their unique id, usernames, and securely hashed passwords. The primary key in this table is the user id, ensuring each user has a distinct identifier within the system.

The **tickets** table plays a vital role in capturing and managing ticket data. It serves as a repository for all ticket-related information, including the associated user ID, unique ticket ID, and the corresponding ticket data. The ticket data is represented as a string, adhering to the prescribed format for Tambula tickets. Each ticket entry is linked to a specific user through the user ID , establishing a clear association between users and their respective tickets.

<p align="center"> <img src="img\schema.png"/></p>

Create users table
```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
Create tickets table
```
CREATE TABLE tickets (
  id INT AUTO_INCREMENT NOT NULL,
  ticket_id BIGINT PRIMARY KEY,
  ticket_data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
## API Endpoints
### Register User
To register a new user, send a POST request to the /auth/register endpoint with the desired username and password in the request body. Replace YOUR_USERNAME and YOUR_PASSWORD with the actual values you want to use.

```
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data '{"username":"YOUR_USERNAME","password":"YOUR_PASSWORD"}'
```
Request body 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `username` | string | Yes      | The desired username for the user. |
| `password` | string | Yes      | The password for the user account. |

Response body 

| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| `message`    | string   | A descriptive message regarding the request status. |

<img src="img\user_register.png">

### User Login 
To authenticate a user and obtain an access JWT token, you can send a POST request to the /auth/login endpoint. The request should include the user's credentials (username and password) in the request body as JSON data.
```
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'
```

Request body 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `username` | string | Yes      | The desired username for the user. |
| `password` | string | Yes      | The password for the user account. |

Response body 

| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| `token`    | string   | JWT token |

<img src="img\user_login.png">

### Create Ticket 
To create a new Tambula ticket, send a POST request to the /tickets/create endpoint
```
curl --location 'http://localhost:3000/tickets/create' \
--header 'authorization: YOUR_JWT_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "ticketCount": 5
}'
```

Request body 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `ticketCount` | int | Yes      | Number of tickets user want. |

Request headers 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `authorization` | string | Yes      | JWT token |

Response body 
| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| `ticketId`    | int   | Unique ticket id |

<img src="img\create_ticket.png">

### Fetch all Ticket
To get all tickets of specific user, send a GET request to the /tickets/allTickets endpoint
```
curl --location --request GET 'http://localhost:3000/tickets/allTickets' \
--header 'authorization: YOUR_JWT_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "userId": YOUR_ID,
    "page": NUMBER_OF_PAGE,
    "limit": NUMBER_OF_DATA_TO_SHOW
}'
```

Request body 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `userId` | int | Yes      | Unique user id |
| `page` | int | Yes      | Page Number |
| `limit` | int | Yes      | Number of data to show |

Request headers 
| Field     | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| `authorization` | string | Yes      | JWT token |

Response body 
| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| [{`ticketData1`},{`ticketData2`},..]    | JSON   | All tickets sepcific user has. |

<img src="img\alltickets.png">
