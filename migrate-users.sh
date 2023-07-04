#!/bin/bash
docker run --rm --network bykstack -v `pwd`/DSL/Liquibase.Users:/liquibase/changelog liquibase/liquibase --defaultsFile=/liquibase/changelog/liquibase.properties update
