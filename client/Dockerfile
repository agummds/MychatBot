# Build tahap pertama menggunakan Node.js
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json lalu install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file frontend dan jalankan build
COPY . .
RUN npm run build

# Tahap kedua: Gunakan Nginx untuk serve frontend
FROM nginx:alpine

# Copy hasil build frontend ke dalam Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Pastikan server berjalan di port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
