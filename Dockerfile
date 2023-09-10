FROM node:17-alpine As development

# setting the image working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json to the image working directory
COPY package*.json ./

# install development dependencies
RUN npm install --only=development --force

# copy the application code to the working directory of image
COPY . .

EXPOSE 3000

#  build the application
RUN npm run build