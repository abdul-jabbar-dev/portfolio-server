#!/bin/bash
URL="http://localhost:54321/functions/v1/gql"

echo "Testing hero..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ hero { title description image resume } }"}' | jq .

echo "Testing about..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ about { title desc img link linkTitle descPosition } }"}' | jq .

echo "Testing projects..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ projects { id title section desc img projectTools } }"}' | jq .

echo "Testing experience..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ experience { companyName id desc location jobPosition startDate endDate companyLink order } }"}' | jq .

echo "Testing contact..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ contact { icon iconStr title desc id link order } }"}' | jq .

echo "Testing footerLinks..."
curl -s -X POST $URL -H "Content-Type: application/json" -d '{"query":"{ footerLinks { id title section desc url icon iconStr } }"}' | jq .
