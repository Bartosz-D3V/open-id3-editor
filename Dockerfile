FROM alpine:latest
LABEL <AUTHOR>="Bartosz Wyporkiewicz"

WORKDIR /home/node/app
COPY . .

RUN apk add --update nodejs nodejs-npm yarn
RUN yarn global add electron
RUN yarn

CMD npm run build:prod
CMD electron ./dist/
