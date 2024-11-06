# Étape de construction
FROM node:22 AS builder

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build


FROM node:22-alpine

WORKDIR /app


COPY --from=builder /app .


RUN npm install


EXPOSE 5173


CMD ["npx", "vite", "preview"]
