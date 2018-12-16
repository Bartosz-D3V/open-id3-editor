FROM electronuserland/builder:latest
LABEL AUTHOR="Bartosz Wyporkiewicz"

WORKDIR /home/node/app
COPY . .

RUN yarn
RUN npm run electron-pack:linux

CMD ./dist/dist/linux-unpacked
