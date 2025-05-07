FROM node:22.14.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Using the development environment variables for local development
RUN cp .env.development .env.production

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "80"]