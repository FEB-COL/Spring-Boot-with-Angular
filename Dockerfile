#!/bin/bash

FROM ubuntu:18.04

# Condicionales --ojo super importante
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install git -y
RUN apt-get upgrade
RUN apt-get install python -y


###################################
# Instalacion de java
###################################

# Install Java.
RUN apt-get install software-properties-common -y
RUN apt-get update -y
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
rm -rf /var/cache/oracle-jdk8-installer


###################################
# Instalacion de Nodejs
###################################
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update \
    && apt-get install -y curl \
&& apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.15.0

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source /usr/local/nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
&& nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


RUN apt-get install zip unzip -y

###################################
# Instalacion de SDKMan y Gradle
###################################

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

RUN \
    cd /usr/local && \
    curl -L https://services.gradle.org/distributions/gradle-5.0-bin.zip -o gradle-5.0-bin.zip && \
    unzip gradle-5.0-bin.zip && \
    rm gradle-5.0-bin.zip

# Export some environment variables 
ENV GRADLE_HOME=/usr/local/gradle-5.0 
ENV PATH=$PATH:$GRADLE_HOME/bin JAVA_HOME=/usr/lib/jvm/java-8-oracle 
 
################################### 
# Instalacion de yeoman-yarn-gulp-bower 
################################### 
#RUN npm install node-sass --allow-root 
#RUN npm rebuild node-sass --allow-root 
#RUN npm install --allow-root 
#RUN apt-get install libkrb5-dev -y 
#RUN npm install node-gyp --python=python2.7 --allow-root 
#RUN npm install web3 --python=python2.7 --allow-root 
RUN apt-get install build-essential -y 
RUN npm install -g yarn --allow-root 
 
 
# Configuracion del proyecto 
WORKDIR /app 
COPY . /app 
 
################################### 
# Instalacion de paquetes del proyecto 
################################### 
# RUN yarn install --allow-root 
 
 
# EXPONGO EL PUERTO  
EXPOSE 8181 
# EJEUCO EL PROYECTO 
# CMD gradle bootRun
