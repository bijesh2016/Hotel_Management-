#!/bin/bash
# Database Setup Script for Hotel Reservation System

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🏨 Hotel Reservation System - Database Setup${NC}\n"

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed or psql is not in PATH${NC}"
    echo "Please install PostgreSQL from: https://www.postgresql.org/download/"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is installed${NC}\n"

# Database connection details
DB_USER="postgres"
DB_PASSWORD="root"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="hotel_reservation"

echo "Connection Details:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  User: $DB_USER"
echo "  Database: $DB_NAME\n"

# Create database
echo -e "${YELLOW}📝 Creating database...${NC}"
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database created successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Database may already exist${NC}"
fi

# Run schema file
echo -e "\n${YELLOW}📊 Creating tables...${NC}"
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -f ./src/database/schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Schema created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create schema${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Database setup completed!${NC}"
echo -e "\n${YELLOW}Test User Accounts:${NC}"
echo "Admin:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
echo "Customer:"
echo "  Email: customer@example.com"
echo "  Password: customer123"
