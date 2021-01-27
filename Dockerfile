FROM alpine:3.10

RUN mkdir -p /usr/app
RUN chmod -R 777 /usr/app

WORKDIR /usr/app

#install yarn
RUN ["apk", "add", "yarn"]

# copy package.json
COPY package*.json /usr/app/

# install dependences
RUN yarn

# copy all files
COPY . .

# build app
RUN ["yarn", "build"]



# expose port
EXPOSE 3000

# run app
CMD ["yarn", "start"]