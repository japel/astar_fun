# astar

a [Sails](http://sailsjs.com) demo application

## Installation

### Plain Node:

npm install sails@1.0.0-20 -g
git clone https://github.com/japel/astar_fun.git
cd astar_fun
npm install
sails lift

### Docker:

git clone https://github.com/japel/astar_fun.git
cd astar_fun
npm run docker-build
docker run -d -p 1337:1337 --name astar astar:0.0.0