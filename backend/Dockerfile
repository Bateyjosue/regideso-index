FROM node:20-alpine
WORKDIR usr/src/app

COPY package*.json ./
COPY entrypoint.sh ./

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

RUN npx prisma generate --schema=/usr/src/app/src/database/schema.prisma
RUN npm run build

ENTRYPOINT [ "/usr/src/app/entrypoint.sh", "npm", "run", "start:prod" ]

CMD [ "npm", "run", "start:prod" ]