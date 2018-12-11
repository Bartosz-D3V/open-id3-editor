FROM node:slim
LABEL <AUTHOR>="Bartosz Wyporkiewicz"

WORKDIR /usr/scr/app
COPY . .

RUN apt-get update -y && \
    apt-get install -y libgtk2.0-0 && \
    apt-get install -y libnotify-dev && \
    apt-get install -y libgconf-2-4 && \
    apt-get install -y libxss1 && \
    apt-get install -y libnss3 && \
    apt-get install -y libasound2
RUN npm install -g electron --unsafe-perm=true --allow-root
RUN npm install

CMD npm run build:prod
CMD electron ./dist/
