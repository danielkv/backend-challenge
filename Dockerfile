FROM alpine:3.10

RUN mkdir -p /usr/app
RUN chmod -R 777 /usr/app

WORKDIR /usr/app

#install yarn
RUN ["apk", "add", "yarn"]
RUN ["apk", "add", "git"]

# copy package.json
COPY package*.json /usr/app/

# install dependences
RUN yarn

# copy all files
COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git wait-for-it

# build app
RUN ["yarn", "build"]

# remove src folder
RUN ["rm", "-r", "./src"]

# expose port
EXPOSE 3000

# run app
CMD ["yarn", "start"]