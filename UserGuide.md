# clone the repo 
git clone https://github.com/OmShirke/WinDhan.git

# go to the server folder
cd server 

# install dependencies
npm install

# create a .env file in server folder and add you mongodb credentials
MONGODB=<Your MongoDB connection string>
PORT=4000

# start the server
node index.js

# go to client
cd ..
cd client

# install dependencies
npm install

# start the frontend
npm start

# your application should be accessible on port 3000

