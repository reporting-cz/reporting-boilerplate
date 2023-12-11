#!/bin/bash

# sleep 10s

while [[ $STATUS != 0 ]]
do
	sleep 5s
	/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -Q "SELECT @@VERSION"
	STATUS=$?
done

echo connected

rm -rf /var/opt/mssql/data/Test.mdf
rm -rf /var/opt/mssql/data/Test_log.ldf

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -i /home/bp-database/create.sql
