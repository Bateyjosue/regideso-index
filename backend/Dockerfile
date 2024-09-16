FROM node:20-alpine
WORKDIR .

COPY package*.json ./
COPY entrypoint.sh ./

RUN npm install

COPY . .

RUN chmod +x ./entrypoint.sh

RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

ENTRYPOINT [ "./entrypoint.sh", "npm", "run", "start:prod" ]

CMD [ "npm", "run", "start:prod" ]