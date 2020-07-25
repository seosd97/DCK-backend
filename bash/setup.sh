#!/bin/bash

dockerize -wait tcp://mysql:3306 -timeout 20s

# npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:undo:all
# npx sequelize-cli db:seed:all

npm start