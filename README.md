A simple boilerplate to ecommerce platafforms created with the next.js framework, it's still at the embryonic stage. 
It's still in early development and lack a lot of features.
- If you want to run it you'll need node, pnpm and docker installed
- to properly run it and get auth working you will need to run pnpx auth secret and set the variables AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET with you personal client id and secret
- you probably still able to run it without these variables, but you will get some errors and the auth with google will not work
- after setting the environment variables in .env file go to the project dir
- independently if you run pnpm dev or pnpm build you need to set docker postgres db
- after seting it uses the env DATABASE_URL= to run the first migration, it'll set all database tables needed
- the command will look something like it:
- DATABASE_URL=postgres://yourdbuser:yourdbuserpassword@localhost:5432/databasename pnpm migrate up
- if you and some fake products data you can use the fake product generator tools with
- DATABASE_URL=postgres://yourdbuser:yourdbuserpassword@localhost:5432/databasename node src/app/database/tools/seedTheDatabaseWithFakeProducts.js
- after seeting the database docker container, the envs for google auth and db connections and running the migration and seeding tool you can simply run pnpm dev to run the dev server
