FROM public.ecr.aws/docker/library/node:20-alpine3.17 AS dev

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm cache clean --force
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

FROM dev AS prod
RUN npm run build
CMD ["npm", "run", "start:prod"]
