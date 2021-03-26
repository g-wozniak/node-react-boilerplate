FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN sed -i s/http/ftp/ /etc/apt/sources.list

RUN apt-get upgrade && apt-get update --fix-missing

ENV DEBIAN_FRONTEND="noninteractive"

# So we can start normal work
RUN apt-get install -yq wget gnupg

# Install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN apt-get update && apt-get install -y mongodb-org

RUN mkdir -p /data/db

EXPOSE 27017

ENTRYPOINT ["/usr/bin/mongod"]
