# Gunakan Node.js sebagai base image
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json lalu install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production 

# Copy semua file backend ke dalam container
COPY . .

# Pastikan backend berjalan di port 2000 (karena sudah EXPOSE 2000)
EXPOSE 2000

# Jalankan server saat container berjalan
CMD ["npx", "nodemon", "index.js"]