# Tambula Ticket API
The Tambula Ticket API is a Node.js-based RESTful API that allows users to create and manage Tambula tickets. Tambula is a game that involves generating unique tickets with specific number patterns. This API provides endpoints for user registration, login, ticket creation, and fetching ticket lists.
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

## Database schema
<p align="center"> <img src="img\Untitled Diagram.drawio.png"/></p>

