FROM node:14.21.3 as build

ENV DockerHOME=/project 
# where your code lives  
RUN mkdir -p $DockerHOME  

# set work directory 
WORKDIR $DockerHOME
RUN npm cache clean --force

COPY . $DockerHOME
RUN npm install -g @angular/cli
RUN npm install
RUN npm run build:prod

FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /project/dist /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80