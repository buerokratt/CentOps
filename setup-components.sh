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

echo -e "[+] \x1b[1;32mcheck for repos\x1b[0m"
if [ -d "TechStack/Ruuter" ]; then
    echo -e "[+] Ruuter clone already exists: checking updates from git"
    cd TechStack/Ruuter
    git fetch
    git pull
    cd ..
else
    echo -e "[+] \x1b[1;32mcloning Ruuter\x1b[0m"
    if [ ! -d "TechStack" ];then 
       mkdir TechStack 
    fi
    (cd TechStack && git clone https://github.com/buerokratt/Ruuter.git)
    sed -i '' 's/FROM openjdk:17-jdk-alpine/FROM --platform=linux\/amd64 openjdk:17-jdk-alpine/' Ruuter/Dockerfile # For Apple Silicon Devices
    (cd Ruuter && docker build -t ruuter .)
fi

if [ -d "TIM" ]; then
    echo -e "[+] TIM clone already exists: checking updates from git"
    cd TIM
    git fetch
    git pull
    cd ..
else
    echo -e "[+] \x1b[1;32mcloning TIM\x1b[0m"
    git clone https://github.com/buerokratt/TIM.git
    sed -i '' 's/FROM node:19/FROM --platform=linux\/amd64 node:19/' TIM/Dockerfile # For Apple Silicon Devices
    (cd TIM && docker build -t tim .)
fi

if [ -d "Resql" ]; then
    echo -e "[+] Resql clone already exists: checking updates from git"
    cd Resql
    git fetch
    git pull
    cd ..
else
    echo -e "[+] \x1b[1;32mcloning Resql\x1b[0m"
    git clone https://github.com/buerokratt/Resql.git
    (cd Resql && docker build -t resql .)
fi

if [ -d "Datamapper" ]; then
    echo -e "[+] DataMapper clone already exists: checking updates from git"
    cd DataMapper
    git fetch
    git pull
    cd ..
else
    echo -e "[+] \x1b[1;32mcloning DataMapper\x1b[0m"
    git clone https://github.com/buerokratt/DataMapper.git
    sed -i '' 's/FROM node:19/FROM --platform=linux\/amd64 node:19/' DataMapper/Dockerfile # For Apple Silicon Devices
    (cd DataMapper && docker build -t datamapper-node .)
fi
