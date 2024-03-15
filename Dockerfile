# this step just fetch node_modules, do not launch this step
FROM node:18.18.2-alpine3.18 as deps
WORKDIR /app
COPY package.json package.json
RUN npm i

# this step start the project with ts-node-dev, with dev dependencies (ts) and livereload
FROM node:18.18.2-alpine3.18 AS dev
WORKDIR /app
COPY package.json package.json
COPY --from=deps /app/node_modules node_modules 
COPY . .
CMD npm run dev

# this step only compile the app (ts to js), do not launch this step
FROM node:18.18.2-alpine3.18 AS build
WORKDIR /app
COPY package.json package.json
COPY --from=deps /app/node_modules node_modules 
COPY tsconfig.json tsconfig.json
COPY .eslintrc.json .eslintrc.json
COPY next.config.js next.config.js
COPY public public
COPY src src
RUN npm run build

# this step launch the app in a prod mode, with only js files and useful deps
FROM node:18.18.2-alpine3.18 AS prod
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY --from=build /app/.next ./.next
COPY package.json package.json
COPY public public
RUN npm install --omit=dev
CMD npm start