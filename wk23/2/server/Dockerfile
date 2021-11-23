FROM node:slim

# Step 4.1 - Add container working directory

WORKDIR /app/server


# Step 4.2 - Copy npm dependencies

COPY package.json /app/server/package.json
COPY src /app/server/src

# Step 4.3 - Install dependencies

RUN npm install


# Copy app source code

COPY . .

#Expose port and start application

EXPOSE 8080

CMD ["npm", "start"]