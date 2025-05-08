# build stage
FROM node:18 AS build-stage

WORKDIR /app

ENV VITE_API_URL=https://api-dev.smartiv.my.id/

ENV VITE_API_PUBLIC=

ENV VITE_API_CDN=https://upload.smartiv.id/api/

ENV VITE_AES_KEY=
ENV VITE_AES_IV=

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]