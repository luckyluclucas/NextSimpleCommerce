Project Description

This is a simple boilerplate for e-commerce platforms, built using the Next.js framework. Please note that it is currently in the early stages of development and lacks many features.

Prerequisites

Before you begin, ensure you have the following installed:

    Node.js
    pnpm
    Docker

Setup Instructions

Clone the Repository with: 
    
    git clone https://github.com/luckyluclucas/NextSimpleCommerce/
    cd NextSimpleCommerce

Install Dependencies:

    pnpm install

Configure Environment Variables:

    Create a .env file in the project root directory by copying the example file (if one exists, e.g., .env.example).
    Authentication Secrets:
        Generate a secret key for authentication. You can use the default Auth.js CLI tool:
        Bash

# Example using Auth.js/NextAuth.js CLI:
pnpx auth secret

Set the output as the AUTH_SECRET variable in your .env file.
Add your Google application credentials to the .env file:
Snippet de código

    AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
    AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    AUTH_SECRET="YOUR_GENERATED_AUTH_SECRET"

    Note: While you might be able to run the application without the AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET variables, you may encounter errors, and Google authentication will not function.

Database Connection:

    Set the DATABASE_URL variable in your .env file, pointing to your PostgreSQL database (see step 5 for an example).

Snippet de código

    DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME"

Set Up Database Container:

    You need a running PostgreSQL database instance. Instructions for setting one up using Docker will be added soon, but for now any tutorial of setting and connection a pg docker container will work.

Run Database Migrations:

    Once the database container is running and the DATABASE_URL is set in your .env file, run the initial database migration to create all necessary tables. The command requires the DATABASE_URL to be accessible:
    Bash

    # Ensure DATABASE_URL is set in your environment or .env file, then run:
    pnpm migrate up
    # OR, if running directly and overriding .env:
    # DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME" pnpm migrate up

Seed Database (Optional):

    To populate the database with fake product data for development or testing, use the provided seeding script:
    Bash

    # Ensure DATABASE_URL is set, then run:
    node src/app/database/tools/seedTheDatabaseWithFakeProducts.js
    # OR, if running directly:
    # DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME" node src/app/database/tools/seedTheDatabaseWithFakeProducts.js

Run the Development Server:

    After completing the setup steps (Docker container, environment variables, migrations, optional seeding), you can start the Next.js development server:
    Bash

pnpm dev
