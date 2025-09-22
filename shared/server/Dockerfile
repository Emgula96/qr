FROM node:20-alpine

WORKDIR /server
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "run", "dev" ]
