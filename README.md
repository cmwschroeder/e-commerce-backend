[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
# E-Commerce Backend

## Description

This database program allows you to keep track of information on various products. You have tables set up with categories which will tell you all the products inside of that category, as well as tables for products and tags that the products will have. When viewing products you will see all the info on which category they are a part of and what tags they have. When viewing tags you will view what products have these tags. You can update the products with new information or tags and you can update the tags with new information and products. You can update the categories with different names as well. You may also delete any categories, products, or tags.

## Table of Contents

* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Questions](#questions)
* [License](#license)

## Technologies

| Technology | Link |
| -------- | ------|
| HTML |   |
| Javascript |    |
| Node.js | https://nodejs.org/en/ |
| npm | https://www.npmjs.com/ |

## Installation

In order to install clone the git repository, then run an npm install. Then to set up the database go into mysql and type in source schema.sql or whatever the file path is to schema.sql, like db/schema.sql if you are in the root directory of the project. From there you need to create a .env file with the DB_NAME set to ecommerce_db, the DB_USER set to your mysql user, in my case root, and the DB_PW set to the user's password. From there we can now seed the db by running 'npm run seed' which will create the tables and some defualt entries into the db. Finally we can now run the code at any time by running npm start.

## Usage

Link to video: https://www.youtube.com/watch?v=UeVpnL5QYuo

## Questions
If you have any questions you can reach me at:  
Github: cmwschroeder  
Github link: https://github.com/cmwschroeder  
Email: cmwschroeder@gmail.com

## License

Licensed under the [MIT License](LICENSE)