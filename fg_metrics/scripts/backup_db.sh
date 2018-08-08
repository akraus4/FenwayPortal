#!/bin/bash

if [[ $# -ne 2 ]]; then
        echo "Usage:   ./$(basename $0) Database User"
        echo "Example: ./$(basename $0) fg_metrics_dev fg_user_dev"
        exit 1
fi

# DB To Export
TARGET_DB=$1
TARGET_USER=$2

BACKUP_DATE=$(date +%F)
BACKUP_NAME="${TARGET_DB}_backup_${BACKUP_DATE}.sql"
BACKUP_BASE_DIR="/opt/metrics/backups"

case $TARGET_DB in
        fg_metrics)             BACKUP_DIR="${BACKUP_BASE_DIR}/prod" ;;
        fg_metrics_dev)         BACKUP_DIR="${BACKUP_BASE_DIR}/dev1" ;;
        fg_metrics_dev2)        BACKUP_DIR="${BACKUP_BASE_DIR}/dev2" ;;
        *)
                echo "Unknown database: ${TARGET_DB}."
                exit 1 ;;
esac

if [[ ! -d ${BACKUP_DIR} ]]; then
        echo "Unable to write to ${BACKUP_DIR}"
        exit 1
fi

# Execute Dump
mysqldump -v -u ${TARGET_USER} -p ${TARGET_DB} > "${BACKUP_DIR}/${BACKUP_NAME}"
if [[ $? -ne 0 ]]; then
        echo "[ERROR] - Database dump exited with a non-zero exit value."
        echo "Target User:         ${TARGET_USER}"
        echo "Target DB:           ${TARGET_DB}"
        echo "Backup Destination:  ${BACKUP_DIR}/${BACKUP_NAME}"
        exit 1
fi

# Compress Script
gzip -v "${BACKUP_DIR}/${BACKUP_NAME}"

if [[ $? -ne 0 ]]; then
        echo "[ERROR] - GZIP Compression of ${BACKUP_DIR}/${BACKUP_NAME} Failed."
        exit 1
fi
