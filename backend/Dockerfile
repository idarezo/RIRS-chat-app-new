FROM node:20-alpine

WORKDIR /app

# kopiraj package datoteke (boljši layer cache)
COPY package*.json ./

# namesti samo production dependencies
RUN npm ci --omit=dev

# kopiraj preostalo kodo
COPY . .

# prilagodi, če backend posluša na drugem portu
EXPOSE 3000

# zagon
CMD ["node", "server.js"]
