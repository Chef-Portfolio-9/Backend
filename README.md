# Chef Portfolio Backend

|  [Jeremy McWilliams](https://github.com/J2Macwilliams)|
|  [jeremyjmcwilliams.com](https://jeremyjmcwilliams.com)|
| :---------------------------------------------------: |
[<img src="./assets/jeremy-mcwilliams.jpg" width = "200" />](https://github.com/J2Macwilliams)   
 </br>Full Stack Developer
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/J2Macwilliams)   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jeremyjmcwilliams/) | 

j2macwilliams.com

## Pitch
As a food blogger, I want to be able to show off my work and recipes. I have a lot of amazing pics from the recipes i’ve created I'd like to share with potential clients, but I need a site that is more professional than Instagram in order to do so. I don’t have time or skills to build my own unique website, I need a site that provides templates so I can just input some information and be done.

## Back End API
chefprtfolio.herokuapp.com/

## Tech Stack
- node.js
- express
- knex
- sqlite3
- pg
- cors
- helmet
- jsonwebtoken
- nodemon
- dotenv
- supertest
- cross-env
- jest


## Chefs Table

| field      | data type        | metadata                                            |
| :--------- | :--------------- | :-------------------------------------------------- |
| id         | unsigned integer | primary key, auto-increments, generated by database |
| username   | string           | required, unique                                    |
| password   | string           | required                                            |
| full_name  | string           | required                                            |
| location   | string           | required                                            |
| restaurant | string           |                                                     |
| chef_img   | binary / blob    |                                                     |

_Endpoints_

- `POST /api/auth/chefs/register` - creates a chef account.
- `POST /api/auth/chefs/login` - login for Chef returns an id and JWT.

_RESTRICTED EndPoints - (must have JWT stored to authorization header in Local Storage)_

- `GET /api/chefs/` - returns a list of all the chefs.
- `GET /api/chefs/:id` - returns a specific chef by id.
- `GET /api/chefs/:id/recipes` - returns a list of recipes for a specific chef.
- `PUT /api/chefs/:id` - updates a specific chef, will hash a new password.
- `DELETE /api/chefs/:id` - deletes a specific chef.

## Users Table

| field     | data type        | metadata                                            |
| :-------- | :--------------- | :-------------------------------------------------- |
| id        | unsigned integer | primary key, auto-increments, generated by database |
| username  | string           | required, unique                                    |
| password  | string           | required                                            |
| chef_id   | integer          | foreign key                                         |
| recipe_id | integer          | foreign key                                         |

_Endpoints_

- `POST /api/auth/users/register` - creates a user account.
- `POST /api/auth/users/login` - login for user returns an id and JWT.

## Recipes Table

| field       | data type        | metadata                                            |
| :---------- | :--------------- | :-------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| recipe_img  | binary / blob    |                                                     |
| recipe_name | string           | required, unique                                    |
| chef_id     | integer          | required, foreign key                               |
| meal_type   | string           | required                                            |

_RESTRICTED EndPoints - (must have JWT stored to authorization header in Local Storage)_

- `GET /api/recipes/` - returns a list of all the recipes.
- `GET /api/recipes/:id` - returns a specific recipe.
- `GET /api/recipes/:id/instructions` - returns a list of instructions for a recipe.
- `POST /api/recipes/` - creates a recipe. MUST INCLUDE (recipe_name & chef_id)
- `PUT /api/recipes/:id` - updates a specific recipe. Must have a change.
- `DELETE /api/recipes/:id` - deletes a specific recipe.

## Ingredients Table

| field           | data type        | metadata                                            |
| :-------------- | :--------------- | :-------------------------------------------------- |
| id              | unsigned integer | primary key, auto-increments, generated by database |
| ingredient_name | string           | required, unique                                    |

_RESTRICTED EndPoints - (must have JWT stored to authorization header in Local Storage)_

- `GET /api/ingredients/` - returns a list of all the ingredients.
- `GET /api/ingredients/:id` - returns a specific ingredient.
- `POST /api/ingredients/` - creates an ingredient. MUST INCLUDE (ingredient_name)
- `PUT /api/ingredients/:id` - updates a specific ingredient. Must have a change.
- `DELETE /api/ingredients/:id` - deletes a specific ingredient.

## Instructions Table

| field       | data type        | metadata                                            |
| :---------- | :--------------- | :-------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| recipe_id   | integer          | required, foreign key                               |
| step_number | integer          | required                                            |
| instruction | string           | required                                            |

_RESTRICTED EndPoints - (must have JWT stored to authorization header in Local Storage)_

- `GET /api/instructions/` - returns a list of all the instructions.
- `GET /api/instructions/:id` - returns a specific instruction.
- `POST /api/instructions/` - creates an instruction. MUST INCLUDE (recipe_id, step_number, instruction)
- `PUT /api/instructions/:id` - updates a specific instruction. Must have a change.
- `DELETE /api/instructions/:id` - deletes a specific instruction.

## Recipe Ingredients Details Table

| field            | data type        | metadata                                            |
| :--------------- | :--------------- | :-------------------------------------------------- |
| id               | unsigned integer | primary key, auto-increments, generated by database |
| recipe_id        | integer          | required, foreign key                               |
| quantity         | float            | required                                            |
| measurement_unit | string           | required                                            |
| ingredient_id    | integer          | required, foreign key                               |

_RESTRICTED EndPoints - (must have JWT stored to authorization header in Local Storage)_

- `GET /api/recipe_details/` - returns a list of all the recipe details.
- `GET /api/recipe_details/:id` - returns a specific recipes details.
- `POST /api/recipe_details/` - creates recipe details. MUST INCLUDE (recipe_id, quantity, measurement_unit, ingredient_id)
- `PUT /api/recipe_details/:id` - updates a specific recipes details. Must have a change.
- `DELETE /api/recipe_details/:id` - deletes a specific recipes details.

## Guest endpoints

- `GET /api/chef/` - returns a list of chefs
- `GET /api/chef/:id` - returns a specific chef
- `GET /api/chef/:id/recipes` - returns a specific chef's list of recipes
- `GET /api/dish/` - returns a list of recipes
- `Get /api/dish/:id` - returns a specific recipe
