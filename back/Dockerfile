# base image  
FROM python:3.9  
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# where your code lives  
RUN mkdir -p $DockerHOME  

# set work directory 
WORKDIR $DockerHOME  


# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN apt-get update && apt-get upgrade -y && apt-get install -y libsqlite3-dev
RUN pip install -U pip setuptools

# copy whole project to your docker home directory. 
COPY requirements.txt $DockerHOME  
# run this command to install all dependencies  
RUN pip install -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
# start server  
# CMD python mysite/manage.py migrate && python mysite/manage.py runserver  