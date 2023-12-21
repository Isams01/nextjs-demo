FROM node:hydrogen-alpine

WORKDIR /app
RUN chown -R node:node /app

RUN ["npm", "install", "-g", "npm@9.6.6"]

ADD --chown=node:node ["package.json", "package.json"]
ADD --chown=node:node ["client.js", "client.js"]

USER 1000

RUN ["npm", "install"]

CMD ["tail", "-f", "/dev/null"]
