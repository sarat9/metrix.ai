# Database for Metrix.ai


## Postgres


- SetUp
```
brew install postgresql

brew services start postgresql

psql --help

```

https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/


### Pending
- Add Postgres docker file
- Create and push docker file for different DBs it can support here








## ERRORS


##

Error
```
psql -U postgres

psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  role "postgres" does not exist
```
Solution:

rm -f /usr/local/var/postgresql@14/postmaster.pid

cd /opt/homebrew/Cellar/postgresql@14/14.13/bin
createuser -s postgres
createdb your_db_name



##