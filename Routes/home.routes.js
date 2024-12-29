const router = require("express").Router();

// Home route
router.get("/", (req, res) => {
  res.json({
    appName: "WriteIt - Notes App Backend",
    description:
      "This is a simple Note app developed to create, update, delete, and fetch notes.",
    routes: {
      auth: {
        "/api/auth/signup": {
          method: "POST",
          description: "Register a new user account",
          request: {
            body: {
              name: "string (minimum 3 characters)",
              email: "string (valid email required)",
              password: "string (minimum 5 characters)",
            },
            headers: {
              "Content-Type": "application/json",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                authToken: "JWT token",
              },
            },
            error: {
              status: 400,
              body: {
                errors: [
                  "Validation errors (e.g. invalid email, short password, etc.)",
                ],
              },
            },
          },
        },
        "/api/auth/signin": {
          method: "POST",
          description: "Login into a user account",
          request: {
            body: {
              email: "string (valid email required)",
              password: "string",
            },
            headers: {
              "Content-Type": "application/json",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                authToken: "JWT token",
              },
            },
            error: {
              status: 400,
              body: {
                errors: ["Please enter valid credentials"],
              },
            },
          },
        },
        "/api/auth/authuser": {
          method: "POST",
          description: "Authenticates a user with token",
          request: {
            headers: {
              "jwtToken": "JWT token (required)",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                user: {
                  id: "User's unique ID",
                  name: "string",
                  email: "string",
                },
              },
            },
            error: {
              status: 401,
              body: {
                message: "Invalid token or unauthorized access",
              },
            },
          },
        },
      },
      notes: {
        "/api/notes/addNote": {
          method: "POST",
          description: "Add a new note",
          request: {
            body: {
              title: "string (minimum 3 characters)",
              description: "string (minimum 3 characters)",
              tag: "string (optional)",
            },
            headers: {
              "Content-Type": "application/json",
              "jwtToken": "JWT token (required)",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                user: "User's unique ID",
                _id: "Note's unique ID",
                title: "string",
                description: "string",
                tag: "string",
                date: "Date (auto-generated)",
              },
            },
            error: {
              1: {
                status: 401,
                body: {
                  message: "Unauthorized access or invalid token",
                },
              },
              2: {
                status: 400,
                body: {
                  errors: [
                    "Validation errors (e.g. missing title, description)",
                  ],
                },
              },
              3: {
                status: 400,
                body: {
                  errors: ["Sorry a note with this title already exists"],
                },
              },
              4: {
                status: 500,
                body: {
                  msg: "An internal server error occured",
                  Error: "Error object is retruned",
                },
              },
            },
          },
        },
        "/api/notes/fetchAllNotes": {
          method: "GET",
          description: "Fetch all notes of the logged-in user",
          request: {
            headers: {
              "jwtToken": "JWT token (required)",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                user: "User's unique ID",
                _id: "Note's unique ID",
                title: "string",
                description: "string",
                tag: "string",
                date: "Date (auto-generated)",
              },
            },
            error: {
              1: {
                status: 401,
                body: {
                  message: "Unauthorized access or invalid token",
                },
              },
              2: {
                status: 500,
                body: {
                  msg: "An internal server error occured",
                  Error: "Error object is retruned",
                },
              },
            },
          },
        },
        "/api/notes/updateNote/:id": {
          method: "PUT",
          description: "Update an existing note",
          request: {
            params: {
              id: "Note's unique ID (required)",
            },
            body: {
              title: "string (minimum 3 characters)",
              description: "string (minimum 3 characters)",
              tag: "string (optional)",
            },
            headers: {
              "Content-Type": "application/json",
              "jwtToken": "JWT token (required)",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                acknowledged: "true | false",
                modifiedCount: "count",
                upsertedId: "value",
                upsertedCount: "count",
                matchedCount: "count",
              },
            },
            error: {
              1: {
                status: 401,
                body: {
                  message: "Unauthorized access or invalid token",
                },
              },
              2: {
                status: 400,
                body: {
                  errors: [
                    "Validation errors (e.g. missing title, description)",
                  ],
                },
              },
              3: {
                status: 400,
                body: {
                  errors: ["Sorry a note with this title already exists"],
                },
              },
              4: {
                status: 500,
                body: {
                  msg: "An internal server error occured",
                  Error: "Error object is retruned",
                },
              },
            },
          },
        },
        "/api/notes/deleteNote/:id": {
          method: "DELETE",
          description: "Delete an existing note",
          request: {
            params: {
              id: "Note's unique ID (required)",
            },
            headers: {
              "jwtToken": "JWT token (required)",
            },
          },
          response: {
            success: {
              status: 200,
              body: {
                acknowledged: "true | false",
                deletedCount: "count",
              },
            },
            error: {
              1: {
                status: 401,
                body: {
                  message: "Unauthorized access or invalid token",
                },
              },
              2: {
                status: 400,
                body: {
                  errors: [
                    "Validation errors (e.g. missing title, description)",
                  ],
                },
              },
              3: {
                status: 400,
                body: {
                  errors: ["Please provide a valid note id"],
                },
              },
              4: {
                status: 500,
                body: {
                  msg: "An internal server error occured",
                  Error: "Error object is retruned",
                },
              },
            },
          },
        },
      },
    },
    developer: {
      name: "Nazakat Umrani",
      rollNumber: "21SW49",
      university:
        "Quaid-e-Awam University of Engineering Science and Technology Nawabshah",
    },
  });
});

module.exports = router;
