#!/bin/bash

ENVIRONMENT=$1
LOG_DIR="/opt/metrics/logs/timecard-import"
LOG_NAME="timecard-import.log"
IMPORT_SCRIPT="src/load-timecards.js"

logger() {
    case $1 in
        INFO|info)
            echo "$(date "+[%F %T]") - [ INFO ]  - $2" | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
            return 0
            ;;
        ERROR|error)
            echo "$(date "+[%F %T]") - [ ERROR ] - $2" | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
            return 0
            ;;
        WARNING|warning)
            echo "$(date "+[%F %T]") - [ WARN ]  - $2" | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
            return 0
            ;;
        *)
            logger "ERROR" "Unknown Logger Format Specified. (\$1 = $1)" | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
            logger "INFO"  "Log: $2" | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
            return 1
    esac
}

if [[ ! -d $LOG_DIR ]]; then
    mkdir -v "$LOG_DIR" || exit 1
fi

if [[ -z $1 ]]; then
    ENVIRONMENT="error"
    logger "ERROR" "Environment Not Specified"
    logger "ERROR" "\$1 = $1"
    exit 1
fi

case $ENVIRONMENT in
    [pP][Rr][Oo][Dd])   APP_PATH="/opt/metrics/environments/prod/fg-metrics"      ;;
    [dD][eE][vV]1)      APP_PATH="/opt/metrics/environments/dev1/fg-metrics"      ;;
    [dD][eE][vV]2)      APP_PATH="/opt/metrics/environments/dev2/fg-metrics"      ;;
    *)
        ENVIRONMENT="error"
        logger "ERROR" "Unknown Environment."
        logger "ERROR" "Environment Given: $ENVIRONMENT"
        exit 1
        ;;
esac

# Begin Timecard Load.
logger "INFO" "==============================="
logger "INFO" "Starting Timecard Load."
logger "INFO" "Environment: $ENVIRONMENT"
logger "INFO" "App Path   : $APP_PATH"

pushd "$APP_PATH" > /dev/null
if [[ $? -ne 0 ]]; then
        logger "ERROR" "Unable to open $APP_PATH"
        exit 1
fi

node "src/load-timecards.js" 2>&1 | tee -a "$LOG_DIR/${ENVIRONMENT}-${LOG_NAME}"
LOAD_STATUS=${PIPESTATUS[0]}
popd > /dev/null

if [[ $LOAD_STATUS -ne 0 ]]; then
    logger "ERROR" "Timecard Load Failed."
    logger "ERROR" "Error Code:   $STATUS"
    logger "ERROR" "Environment:  $ENVIRONMENT"
    logger "ERROR" "App Path:     $APP_PATH"
    exit 1
else
    logger "INFO" "Timecard Load Complete."
    exit 0
fi
