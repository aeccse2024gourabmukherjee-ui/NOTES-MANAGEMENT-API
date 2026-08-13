 # Notes Management API

A RESTful backend API for managing user accounts and personal notes.
The application provides user authentication using JWT and allows
authenticated users to create, read, update, and delete their notes.

## Features
- User registration and login
- JWT-based authentication
- Protected routes
- Create notes
- View notes
- Update notes
- Delete notes
- User-specific notes
- MongoDB database integration
- Request validation
- RESTful API architecture
- 
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- JavaScript
- Postman / Thunder Client
- ## Project Structure


notes-management-api/
├── config/ db.js
├── controller/
│   ├── notescontroller.js
│   └── usercontroller.js
├── middleware/
│   ├── auth.js
│   └── validateuser.js
├── models/
│   ├── notesmodel.js
│   └── usermodel.js
├── routes/
│   ├── notesroutes.js
│   └── userroutes.js
├── server.js
├── package.json
└── .env
