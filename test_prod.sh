#!/bin/bash
URL="https://pyoaowwarxwvraghsvpz.supabase.co/functions/v1/gql"

echo "Testing hero..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ hero { title } }"}' | jq .

echo -e "\nTesting about..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ about { title } }"}' | jq .

echo -e "\nTesting projects..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ projects { id title } }"}' | jq .

echo -e "\nTesting experience..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ experience { companyName } }"}' | jq .

echo -e "\nTesting contact..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ contact { title } }"}' | jq .

echo -e "\nTesting footerLinks..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ footerLinks { title } }"}' | jq .
