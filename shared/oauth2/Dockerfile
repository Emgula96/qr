FROM node:20-alpine

WORKDIR /oauth2
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
EXPOSE 3040
CMD [ "npm", "run", "dev" ] 