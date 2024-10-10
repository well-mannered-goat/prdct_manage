# Product Management API - TypeScript Express Server

A RESTful API service built with TypeScript and Express.js for managing products. This service provides endpoints for creating, reading, updating, and deleting product information.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Sequilize ORM
- Docker

## Prerequisites

Before running this project, make sure you have the following installed:
- Docker & Docker Compose
- Node.js (v16 or higher)
- npm or yarn

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/well-mannered-goat/prdct_manage
cd prdct_manage
```

2. Create environment file:
   - Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
   - Update the following variables in `.env`:
     ```
     # Server Configuration
     PORT=3000

     # Database Configuration
     DB_HOST=postgres
     DB_PORT=5432
     DB_NAME=products_db
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_URL=production_db_url
     ```

3. Start the Docker containers:
```bash
docker-compose up -d
```

This will start the PostgreSQL database.

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/products` | Create a new product |
| GET | `/products` | Retrieve products with pagination and filters |
| GET | `/products/:id` | Retrieve a specific product |
| PUT | `/products/:id` | Update a specific product |
| DELETE | `/products/:id` | Delete a specific product |

### GET /products Query Parameters

The GET `/products` endpoint supports the following query parameters for pagination and filtering:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| page | number | Page number (default: 1) | `/products?page=2` |
| limit | number | Number of items per page (default: 10) | `/products?limit=20` |
| name | string | Filter products by name (case-insensitive) | `/products?name=laptop` |
| category | string | Filter products by category | `/products?category=electronics` |

### Request Body Schema (POST/PUT)

```typescript
{
  name: string;        // required
  price: number;       // required
  description?: string; // optional
  category: string;    // required
}
```

## Development

### Running Locally Without Docker

1. Install dependencies:
```bash
npm install
```

2. Build and start container:
```bash
docker-compose up -d
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file based on `.env.example`. Here's what each variable means:

- `PORT`: The port number where the server will run
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_URL`: Production DB URL is present

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Internal server error
