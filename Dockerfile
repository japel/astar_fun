FROM japel/alpine-node-lts:0.0.2

WORKDIR /opt/apps

# Bundle app source
COPY . /opt/apps

# Install app dependencies
RUN npm install --production

# Add files.
ADD docker_start.sh /opt/apps/docker_start

RUN chmod +x /opt/apps/docker_start

EXPOSE  1337
CMD ["/opt/apps/docker_start"]