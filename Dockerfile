FROM node AS build

WORKDIR /app
COPY . .

RUN npm install -g @quasar/cli
RUN npm install
RUN quasar build

FROM nginx

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html
