A simple boilerplate to ecommerce platafforms created with the next.js framework, it's still at the embryonic stage. 
It's still in early development and lack a lot of features.
- If you want to run it you'll need node, pnpm and docker installed
- to properly run it and get auth workign you will need to run pnpx auth secret and set the variables AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRETt with you personal client id and secret
- you probably still able to run it without these variables if you run pnpx dev, but you will get some errors and the auth with google will not work
- go to the project dir
- run sudo docker build -t nextcommerce:dev ./
- run sudo docker run -p 3000:3000 nextcommerce:dev
- that's it.
