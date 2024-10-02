FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm i
ENTRYPOINT ["npm", "start"]
