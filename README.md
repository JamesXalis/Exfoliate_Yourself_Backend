# Exfoliate_Yourself_Backend

## Table of Contents
* [Description](##Description)
* [Technologies](##Technologies)
* [Demo](##Demo)
* [Screenshot](##Screenshot)
* [Installation](##Installation)
* [Usage](##Usage)
* [License](##License)
* [Questions](##Questions)


## Description

This node application is a sample backend API for an e-commerce database. The database models include categories, products within those categories, and tags that each product has. Each Product tag is associated with tags, developing an indirect relationship between tags and products. API routes are set up for front end developers to make fetch requests and perform CRUD operations on any of the models.

### Technologies

As this application runs on node, many of the foundational technologies in this application use node npm packages, namely MySQL2, Sequelize, and Express. Naturally, SQL was used as the database, interacted with using sequelize node package as previously mentioned. Express was used for the server instance, which handles routes and controls sequelize operations.

### Future Development

This application will eventually host a much more expansive suite of database models, and more template features. 
## Demo


## Screenshot


---

## Installation

Installation instructions: `npm i`   
On MySQL CLI: run `SOURCE db/schema.sql`  
On CLI: run `npm run seed`  
Create an .env file in the root directory with three variables with your respective credentials: `DB_NAME='database name'` `DB_USER='user name'` `DB_PASSWORD='SQL password'`  


## Usage

In Windows Command Processor/Terminal, run `node server.js`  


## License

No license

---

## Questions
