FROM node:16-alpine
WORKDIR /usr/src/app/
COPY ./package.json .
EXPOSE 3000
RUN npm install --omit=dev --ignore-scripts
COPY . .
CMD ["npm", "start"]