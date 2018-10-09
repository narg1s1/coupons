FROM node:8.11.3 as builder

COPY . /payever
RUN echo 'machine gitlab.devpayever.com login deploybot password tVUeMCwr3SUWod4UGxDD' > ~/.netrc
RUN apt-get update && apt-get install -y curl git bzip2 openssh-client --no-install-recommends
RUN cd /payever/ && npm install
RUN cd /payever/ && npm run build


FROM registry.devpayever.com/nginx:master
COPY --from=builder /payever/dist /usr/share/nginx/html
