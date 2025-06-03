# Timeout for connection attempt in seconds
TIMEOUT=5

# Number of retry attempts
RETRIES=3

# Function to check database connectivity
check_database() {
  # Extract the host and port from the URL
  DB_HOST_PORT=$(echo $DATABASE_URL | awk -F@ '{print $2}')

  DB_HOST=$(echo $DB_HOST_PORT | cut -d: -f1)
  DB_PORT=$(echo $DB_HOST_PORT | cut -d: -f2 | awk -F/ '{print $1}')

  i=1
  while [ $i -le $RETRIES ]; do
    if nc -z -w $TIMEOUT $DB_HOST $DB_PORT; then
      echo "Database is available."
      return 0
    else
      echo "Attempt $i: Error - Database is not available."
    fi

    sleep 1  # Wait for 1 second before the next attempt
    i=$((i + 1))
  done

  echo "Failed after $RETRIES attempts."
  return 1
}

check_database

if [ $? -ne 0 ]; then
  echo "Exiting script due to database check failure."
  exit 1
fi

# Check where the container is running: Cloud Run or Job
if [[ ! -z "$K_JOB" ]]; then
    echo "Running on Cloud Run Job - Migrations skipped"
else
    echo "Running on Cloud Run Service: $K_SERVICE"
    npx prisma migrate deploy
fi

# Check the exit status of the Prisma migration
if [ $? -eq 0 ]; then
  # If the migration succeeded, run the start command
  node apps/api/main.js
else
  # If the migration failed, print an error message
  echo "Prisma migration failed. Aborting npm run start."
  exit 1
fi