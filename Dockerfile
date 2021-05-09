FROM node:lts-alpine

RUN mkdir -p /home/app

RUN chown node:node /home/app

WORKDIR /home/app

USER node

COPY --chown=node:node package.json .

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "watch"]