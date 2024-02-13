FROM node:18.19.0-alpine

WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

EXPOSE 8000

CMD ["npm", "start"]
