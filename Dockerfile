# build stage
FROM node:18 AS build-stage

WORKDIR /app

ENV VITE_API_URL=https://api-dev.mitra3m.id/commander/

ENV VITE_API_PUBLIC=https://api-dev.mitra3m.id/public-access/

# VITE_API_URL=https://api.mitra3m.id/commander/

# VITE_API_PUBLIC=https://api.mitra3m.id/public-access/

ENV VITE_API_CDN=https://cdn.mitra3m.id/

ENV VITE_AES_KEY=89a42a7329f09329c633cf7df83be370
ENV VITE_AES_IV=c94c797ec129daf292351f55

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