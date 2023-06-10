#!/bin/bash
echo -e "[+] \x1b[1;32mcheck prerequisites\x1b[0m"
for cmd in docker docker-compose git; do
    if ( ! which "$cmd" > /dev/null 2>&1 ); then
        echo -e "[+] \x1b[1;33mCommand '$cmd' is required, but not installed! Aborting.\x1b[0m"
        exit 1
    else
        echo -e "[+] Command '$cmd' is installed"
    fi
done

if ! docker info > /dev/null 2>&1; then
  echo "This script uses docker, and it isn't running - please start docker and try again!"
  exit 1
fi

TIM_PORT='8055'
DATA_MAPPER_PORT='8054'

echo -e "[+] \x1b[1;32mcheck for repos\x1b[0m"
if [ -d "TechStack/Ruuter" ]; then
    echo -e "[+] Ruuter clone already exists: checking updates from git"
    cd TechStack/Ruuter
    git fetch
    git pull
    if [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ];then
     docker build -t ruuter .
    fi 
    cd ../..
else
    echo -e "[+] \x1b[1;32mcloning Ruuter\x1b[0m"
    if [ ! -d "TechStack" ];then 
       mkdir TechStack 
    fi
    (cd TechStack && git clone https://github.com/buerokratt/Ruuter.git)
    sed -i '' 's/FROM openjdk:17-jdk-alpine/FROM --platform=linux\/amd64 openjdk:17-jdk-alpine/' TechStack/Ruuter/Dockerfile # For Apple Silicon Devices
    sed -i '' 's/.allowedMethods(allowedMethods);/.allowedMethods(allowedMethods)\n.allowCredentials(true);/' TechStack/Ruuter/src/main/java/ee/buerokratt/ruuter/configuration/CORSConfiguration.java
    (cd TechStack/Ruuter && docker build -t ruuter .)
fi

if [ -d "TechStack/TIM" ]; then
    echo -e "[+] TIM clone already exists: checking updates from git"
    cd TechStack/TIM
    git fetch
    git pull
    if [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ];then
     docker build -t tim .
    fi
    cd ../..
else
    echo -e "[+] \x1b[1;32mcloning TIM\x1b[0m"
    (cd TechStack && git clone https://github.com/buerokratt/TIM.git)
    sed -i '' 's/FROM node:19/FROM --platform=linux\/amd64 node:19/' TechStack/TIM/Dockerfile # For Apple Silicon Devices
    sed -i '' 's/host.docker.internal:9876/host.docker.internal:8056/' TechStack/TIM/src/main/resources/application.properties
    sed -i '' 's/security.allowlist.jwt=127.0.0.1,::1/security.allowlist.jwt=ruuter-private,ruuter-public,resql,database,data_mapper,tim,tim-postgresql,gui_dev_private,gui_dev_public,127.0.0.1,::1/' TechStack/TIM/src/main/resources/application.properties
    sed -i '' "s/server.port=8085/server.port=$TIM_PORT/" TechStack/TIM/src/main/resources/application.properties
    (cd TechStack/TIM && docker build -t tim .)
fi

if [ -d "TechStack/Resql" ]; then
    echo -e "[+] Resql clone already exists: checking updates from git"
    cd TechStack/Resql
    git fetch
    git pull
    if [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ];then
     docker build -t resql .
    fi
    cd ../..
else
    echo -e "[+] \x1b[1;32mcloning Resql\x1b[0m"
    (cd TechStack && git clone https://github.com/buerokratt/Resql.git)
    (cd TechStack/Resql && docker build -t resql .)
fi

if [ -d "TechStack/Datamapper" ]; then
    echo -e "[+] DataMapper clone already exists: checking updates from git"
    cd TechStack/DataMapper
    git fetch
    git pull
    if [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ];then
     docker build -t datamapper .
    fi
    cd ../..
else
    echo -e "[+] \x1b[1;32mcloning DataMapper\x1b[0m"
    (cd TechStack && git clone https://github.com/buerokratt/DataMapper.git)
    sed -i '' 's/FROM node:19/FROM --platform=linux\/amd64 node:19/' TechStack/DataMapper/Dockerfile # For Apple Silicon Devices
    sed -i '' "s/const PORT = 3000;/const PORT = $DATA_MAPPER_PORT;/" TechStack/DataMapper/server.js
    (cd TechStack/DataMapper && docker build -t datamapper .)
fi
