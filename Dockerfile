FROM node:10.9-stretch

RUN apt update && apt install -y \
    libgtk-3-0 \
    libcanberra-gtk3-module \
    libx11-xcb-dev \
    libgconf2-dev \
    libnss3 \
    libasound2 \
    libxtst-dev \
    libxss1 \
    git \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "start"]
