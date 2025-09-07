FROM node:20-bullseye
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/goodchildwilliamz/GOODCHILD-MD.git /home/node/GOODCHILD-MD
WORKDIR /home/node/GOODCHILD-MD
RUN chmod -R 777 /home/node/GOODCHILD-MD/
RUN yarn install --network-concurrency 1 --ignore-engines
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
