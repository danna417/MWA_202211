# CS572
Modern Web Application

## Exam requirements
Compress as zip

Need to delete node_modules, angular( node_modules, .angular, .vscode )


## NPM commands
```
npm i -g nodemon (already Installed)
npm i -g typescript (already installed)

npm i express
npm i mongoose
npm i dotenv
npm i bcrypt
```

## @angular/cli commands
```
ng new app-name --skip-git=true --skip-tests=true –-directory public\app-name –-defaults=true
ng serve
ng generate component home
```

## Mongoose commands

```
mongosh
show dbs;
use db;
use newDB;

to delete DB
db.dropDatabase();

show collections;
db.createCollection("name");
db.collection.find();
db.collection.findOne({});

db.collection.dropIndexes();
db.collection.getIndexes();

Import
mongorestore --gzip dump\
mongorestore --nsInclude=meanGames.games --gzip dump\

Export
Export MongoDB data as BSON file
mongodump --db meanGames

Compress the BSON output data
mongodump --db meanGames --gzip

Export to file
mongoexport --db meanGames –-collection users --out output/game-users.json

Export as an array
mongoexport --db meanGames –-collection users–out output/game-users.json --jsonArray --pretty
