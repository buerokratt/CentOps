FROM node:22.16.0-alpine as build
WORKDIR /usr/centops-gui
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.4-alpine
COPY --from=build /usr/centops-gui/dist /usr/share/nginx/html
COPY ./nginx/http-nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]