Project Description

This is a simple boilerplate for e-commerce platforms, built using the Next.js framework. Please note that it is currently in the early stages of development and lacks many features.

Prerequisites

Before you begin, ensure you have the following installed:

    Node.js
    pnpm
    Docker

# Setup Instructions

Clone the Repository with: 
    
    git clone https://github.com/luckyluclucas/NextSimpleCommerce/
    cd NextSimpleCommerce

Install Dependencies:

    pnpm install

Configure Environment Variables:

Create a .env file in the project root directory by copying the example file:
    
    mv .example.env .env


# Set a secret using Auth.js/NextAuth.js CLI:

    pnpx auth secret

By default Auth.js will set the output on an .env.local with the AUTH_SECRET there, just copy the content to the .env file

After that add your Google application credentials to the .env file:

    AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
    AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    AUTH_SECRET="YOUR_GENERATED_AUTH_SECRET"

    Note: While you might be able to run the application without the AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET variables, you may encounter errors, and Google authentication will not function.

# Database Connection:

You need to set the DATABASE_URL variable in your .env file, pointing to your PostgreSQL database (see bellow as an example, change the user pass and name to the ones you set).

    DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME"

Set Up a Database Container using docker

Run Database Migrations:

Once the database container is running and the DATABASE_URL is set in your .env file, run the initial database migration to create all necessary tables. The command requires the DATABASE_URL to be accessible:

    # Ensure DATABASE_URL is set in your environment or .env file, then run:
    pnpm migrate up
    # OR, if running directly and overriding .env:
    DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME" pnpm migrate up

Seed Database (Optional):

To populate the database with fake product data for development or testing, use the provided seeding script:

    # Ensure DATABASE_URL is set, then run:
    node src/app/database/tools/seedTheDatabaseWithFakeProducts.js
    # OR, if running directly:
    DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME" node src/app/database/tools/seedTheDatabaseWithFakeProducts.js

Run the Development Server:

After completing the setup steps (Docker container, environment variables, migrations, optional seeding), you can start the Next.js development server:
    
    pnpm dev
