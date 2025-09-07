# Stocks

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Move into the project directory
cd your-repo-name

# Install dependencies
npm install
```

Note: Generate the dataset using the 1st command to use the search feature well

```bash
# Generate mode
npm run gen

# Development mode
npm run dev


```

## 📁 Project Structure

```bash
your-repo-name/
│── src/
│   ├── constants/        # Constant values (e.g., messages, codes)
│   ├── controllers/      # Request handlers
│   ├── DB/               # Database connection/config
│   ├── helpers/          # Utility/helper functions
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Database models (e.g., Mongoose/Sequelize)
│   ├── routes/           # Route definitions
│   └── app.js         # Main entry point
│── .env                  # Environment variables
│── package.json
│── README.md
```

## 🔑 Environment Variables

Create a .env file in the root:

```bash

PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=postgres
```

### Implementation of Stock Order Matching System in JavaScript -

[Watch Video](https://www.loom.com/share/f8f4cdaf9c7a4eafbff49cb534f59bd3)

I discuss my approach to a
project focused on implementing in-memory data structures for managing stock orders, while also exploring the use of
databases. I’ve developed a simple JavaScript-based server that handles buying and selling orders, along with a search
feature for stock IDs. Due to time constraints, I wasn't able to complete all test cases or the front end, but I’ve
shared my progress and the challenges I faced, particularly with concurrency issues in the database. I would appreciate
any feedback on my implementation and suggestions for improvement. Thank you for watching!
