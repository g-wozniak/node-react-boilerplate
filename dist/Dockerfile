FROM node:12

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NODE_ENV=${NODE_ENV}

ENV DIST_DIR=..

ENV WEBAPP_COMPRESSION=${WEBAPP_COMPRESSION}

ENV PORT=${PORT}

WORKDIR /app

COPY . /app

EXPOSE ${PORT}

RUN npm ci --only=prod

RUN ls

CMD [ "npm", "start" ]
