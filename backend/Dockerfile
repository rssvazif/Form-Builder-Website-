FROM node:22.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000 

CMD ["node","/app/index.js"]