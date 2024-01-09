FROM node:lts AS buildClient
WORKDIR /client
COPY ./client .
RUN npm ci && npm i -g @quasar/cli
RUN quasar build

FROM node:lts AS buildServer
WORKDIR /server
COPY ./server .
RUN npm ci
RUN npm run build

FROM node:lts AS buildFinal
ENV NODE_ENV=production
WORKDIR /app
COPY --from=buildServer /server/dist .
COPY ./server/package.json ./server/package-lock.json ./
COPY --from=buildClient /client/dist/spa ./public
RUN npm ci
EXPOSE 3000
CMD ["node", "index.js"]