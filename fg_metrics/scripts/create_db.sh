#!/bin/bash

if [[ $# -ne 2 ]]; then
        echo "Invalid Number Of Parameters"
        echo "Usage:   ./$(basename $0) <DB_Name> <DB_User>"
        echo "Example: ./$(basename $0) fg_metrics_dev1 fg_user_dev1"
        exit 1
fi

DB_ADMIN_USER="root"
DB_NAME="$1"
DB_USER_NAME="$2"
echo "Enter DB User Password: "
read -s DB_USER_PASS

if [[ -z $DB_USER_PASS ]]; then
        echo "Password cannot be empty."
        exit 1
fi

cat > create_db.sql << EOF
CREATE DATABASE ${DB_NAME};
CREATE USER '${DB_USER_NAME}'@'%' IDENTIFIED BY '${DB_USER_PASS}';
GRANT ALL ON ${DB_NAME}.* TO '${DB_USER_NAME}'@'%';
FLUSH PRIVILEGES;
SELECT User, Host, Password FROM mysql.user;
EOF

cat create_db.sql
mysql -v -u root -p < "create_db.sql"
rm -v create_db.sql
