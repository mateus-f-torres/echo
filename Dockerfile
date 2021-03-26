FROM node:14.16.0-alpine AS build

WORKDIR /usr/src/echo
COPY . /usr/src/echo

RUN yarn install --immutable
RUN yarn build

FROM nginx:alpine
COPY --from=build /usr/src/echo/dist /usr/share/nginx/html
