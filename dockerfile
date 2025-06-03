# Step 1: Build the application
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm i 

ARG VITE_API_BASE_URL
RUN echo "VITE_API_BASE_URL is: $VITE_API_BASE_URL"

COPY . .
RUN npm run build

#Step 2 : Use nginx to builld 
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf  
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]