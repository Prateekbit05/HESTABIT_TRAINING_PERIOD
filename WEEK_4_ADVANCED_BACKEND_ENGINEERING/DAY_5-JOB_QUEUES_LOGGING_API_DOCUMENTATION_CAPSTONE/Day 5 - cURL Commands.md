# 🔧 Day 5 - cURL Commands
> Job Queues, Logging, API Docs & PM2 Process Management

---

## 📋 Table of Contents
1. [Health & API Docs](#health--api-docs)
2. [Request Tracing](#request-tracing)
3. [User Management](#user-management)
4. [Product Management](#product-management)
5. [Job Queue - Email](#job-queue--email)
6. [Job Queue - Reports](#job-queue--reports)
7. [PM2 Process Management](#pm2-process-management)
8. [Log Monitoring](#log-monitoring)
9. [Performance & Load Testing](#performance--load-testing)

---

## 🏥 Health & API Docs

### Basic Health Check
```bash
curl http://localhost:3000/health
```

### Health Check - Pretty Print
```bash
curl http://localhost:3000/health | jq '.'
```

### Health Check with Custom Request ID
```bash
curl -H "X-Request-ID: my-trace-001" http://localhost:3000/health
```

### View All Response Headers (security + tracing headers)
```bash
curl -v http://localhost:3000/health
```

### Get Swagger JSON Spec
```bash
curl http://localhost:3000/api-docs.json
```

### Save Swagger Spec to File
```bash
curl http://localhost:3000/api-docs.json -o swagger-spec.json
```

### Open Swagger UI in Browser
```bash
xdg-open http://localhost:3000/api-docs
```

---

## 🔍 Request Tracing

### Send with Custom Correlation ID
```bash
curl -H "X-Request-ID: debug-session-001" \
  http://localhost:3000/api/users
```

### Extract Correlation ID from Response Header
```bash
curl -sI http://localhost:3000/health | grep -i "x-request-id"
```

### Trace a Full Request Lifecycle
```bash
curl -v -H "X-Request-ID: trace-$(date +%s)" \
  http://localhost:3000/api/users 2>&1 | grep -E "(< X-|> X-|{)"
```

### Measure Response Time
```bash
curl -w "\nDNS: %{time_namelookup}s | Connect: %{time_connect}s | Total: %{time_total}s\n" \
  -o /dev/null -s http://localhost:3000/api/users
```

---

## 👥 User Management

### ✅ Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "user"
  }'
```

### ✅ Create Admin User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "role": "admin"
  }'
```

### ✅ Create User + Save ID to Variable
```bash
USER_ID=$(curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!@"
  }' | jq -r '.data._id')

echo "Created User ID: $USER_ID"
```

### Get All Users
```bash
curl http://localhost:3000/api/users | jq '.'
```

### Get Users - Paginated
```bash
curl "http://localhost:3000/api/users?page=1&limit=10" | jq '.'
```

### Get Users - Sorted by Date (Newest First)
```bash
curl "http://localhost:3000/api/users?sort=-createdAt" | jq '.'
```

### Get Users - Filter by Role
```bash
curl "http://localhost:3000/api/users?role=admin" | jq '.'
```

### Get Users - Search by Name
```bash
curl "http://localhost:3000/api/users?search=john" | jq '.'
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/$USER_ID | jq '.'
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated"
  }' | jq '.'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/$USER_ID | jq '.'
```

### Create 5 Users in Bulk
```bash
for i in {1..5}; do
  curl -s -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"User $i\",
      \"email\": \"user$i@example.com\",
      \"password\": \"Pass123!@\"
    }" | jq '.data._id'
  sleep 0.3
done
```

---

## 📦 Product Management

### ✅ Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro M3",
    "description": "14-inch laptop with M3 chip",
    "price": 1999.99,
    "category": "Electronics",
    "stock": 25,
    "brand": "Apple",
    "tags": ["laptop", "apple", "m3"]
  }' | jq '.'
```

### ✅ Create Product + Save ID
```bash
PRODUCT_ID=$(curl -s -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 99.99,
    "category": "Test",
    "stock": 10
  }' | jq -r '.data._id')

echo "Created Product ID: $PRODUCT_ID"
```

### Get All Products
```bash
curl http://localhost:3000/api/products | jq '.'
```

### Get Products - Filter by Category
```bash
curl "http://localhost:3000/api/products?category=Electronics" | jq '.'
```

### Get Products - Price Range
```bash
curl "http://localhost:3000/api/products?minPrice=500&maxPrice=2000" | jq '.'
```

### Get Products - Sort by Price Descending
```bash
curl "http://localhost:3000/api/products?sort=-price" | jq '.'
```

### Get Products - Complex Query
```bash
curl "http://localhost:3000/api/products?category=Electronics&minPrice=500&sort=-price&page=1&limit=10" | jq '.'
```

### Get Product by ID
```bash
curl http://localhost:3000/api/products/$PRODUCT_ID | jq '.'
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/$PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1799.99,
    "stock": 30
  }' | jq '.'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/$PRODUCT_ID | jq '.'
```

---

## 📧 Job Queue - Email

### ✅ Queue Simple Email
```bash
curl -X POST http://localhost:3000/api/jobs/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Welcome!",
    "text": "Thank you for joining us!"
  }' | jq '.'
```

### ✅ Queue Email with HTML Body
```bash
curl -X POST http://localhost:3000/api/jobs/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Welcome to Our Platform",
    "text": "Thank you for joining!",
    "html": "<h1>Welcome!</h1><p>Thank you for joining us!</p>"
  }' | jq '.'
```

### ✅ Queue Email + Save Job ID
```bash
EMAIL_JOB_ID=$(curl -s -X POST http://localhost:3000/api/jobs/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "text": "This is a test"
  }' | jq -r '.jobId')

echo "Email Job ID: $EMAIL_JOB_ID"
```

### Queue 5 Emails in Loop
```bash
for i in {1..5}; do
  JOB=$(curl -s -X POST http://localhost:3000/api/jobs/send-email \
    -H "Content-Type: application/json" \
    -d "{
      \"to\": \"user$i@example.com\",
      \"subject\": \"Email $i\",
      \"text\": \"This is email number $i\"
    }" | jq -r '.jobId')
  echo "Queued job $i: $JOB"
  sleep 0.2
done
```

---

## 📊 Job Queue - Reports

### ✅ Generate User Stats Report
```bash
curl -X POST http://localhost:3000/api/jobs/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "user-stats"
  }' | jq '.'
```

### ✅ Generate Product Stats Report
```bash
curl -X POST http://localhost:3000/api/jobs/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "product-stats"
  }' | jq '.'
```

### ✅ Generate Report for Specific User
```bash
curl -X POST http://localhost:3000/api/jobs/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "user-stats",
    "userId": "65abc123def456789"
  }' | jq '.'
```

### ✅ Generate Report + Save Job ID
```bash
REPORT_JOB_ID=$(curl -s -X POST http://localhost:3000/api/jobs/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "product-stats"
  }' | jq -r '.jobId')

echo "Report Job ID: $REPORT_JOB_ID"
```

---

## ⚙️ PM2 Process Management

### Start All Processes
```bash
pm2 start prod/ecosystem.config.js
```

### Start in Production Mode
```bash
pm2 start prod/ecosystem.config.js --env production
```

### View Process Table
```bash
pm2 list
```

### View Detailed Info for api-server
```bash
pm2 show api-server
```

### Monitor CPU + Memory Live
```bash
pm2 monit
```

### Restart All
```bash
pm2 restart all
```

### Restart Only api-server
```bash
pm2 restart api-server
```

### Reload api-server (Zero-Downtime)
```bash
pm2 reload api-server
```

### Stop All
```bash
pm2 stop all
```

### Delete All Processes
```bash
pm2 delete all
```

### Kill PM2 Daemon (Full Reset)
```bash
pm2 kill
```

### Save Process List (survives reboot)
```bash
pm2 save
```

### Auto-Start on System Boot
```bash
pm2 startup
pm2 save
```

### Scale api-server to 4 Instances
```bash
pm2 scale api-server 4
```

### Scale to Max CPU Cores
```bash
pm2 scale api-server max
```

---

## 📋 Log Monitoring

### Tail All Logs Live
```bash
pm2 logs
```

### Tail api-server Logs Only
```bash
pm2 logs api-server --lines 50
```

### Tail email-worker Logs
```bash
pm2 logs email-worker --lines 50
```

### Tail report-worker Logs
```bash
pm2 logs report-worker --lines 50
```

### Watch Application Logs Live
```bash
tail -f logs/combined-*.log
```

### Watch Error Logs
```bash
tail -f logs/pm2-error.log
```

### Watch Email Worker Logs
```bash
tail -f logs/email-worker-out.log
```

### Watch Report Worker Logs
```bash
tail -f logs/report-worker-out.log
```

### Filter Logs by Level
```bash
tail -f logs/combined-*.log | grep "error"
tail -f logs/combined-*.log | grep "warn"
tail -f logs/combined-*.log | grep "info"
```

### Filter Logs by Correlation ID
```bash
tail -f logs/combined-*.log | grep "my-trace-001"
```

### Clear PM2 Logs
```bash
pm2 flush
```

---

## 🚀 Performance & Load Testing

### Single Request Timing
```bash
curl -w "\nTotal Time: %{time_total}s\n" -o /dev/null -s \
  http://localhost:3000/api/users
```

### 10 Sequential Requests with Timing
```bash
for i in {1..10}; do
  curl -s -w "Request $i: %{time_total}s\n" \
    http://localhost:3000/api/users -o /dev/null
done
```

### 50 Concurrent Requests
```bash
for i in $(seq 1 50); do
  curl -s http://localhost:3000/api/users > /dev/null &
done
wait
echo "All 50 requests completed"
```

### Rate Limit Test (Stop at 429)
```bash
count=0
while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users)
  count=$((count + 1))
  echo "Request $count: HTTP $STATUS"
  [ "$STATUS" = "429" ] && echo "⚠️  Rate limited at request $count!" && break
  sleep 0.1
done
```

### Check API is Up (Health Monitor Script)
```bash
#!/bin/bash
while true; do
  if curl -s http://localhost:3000/health > /dev/null; then
    echo "$(date): ✅ API healthy"
  else
    echo "$(date): ❌ API DOWN"
  fi
  sleep 30
done
```

---

## 💡 Useful Aliases

Add to `~/.bashrc`:

```bash
# Day 5 API shortcuts
alias api-health='curl http://localhost:3000/health | jq .'
alias api-users='curl http://localhost:3000/api/users | jq .'
alias api-products='curl http://localhost:3000/api/products | jq .'
alias api-docs='xdg-open http://localhost:3000/api-docs'
alias pm2-status='pm2 list'
alias pm2-logs='pm2 logs --lines 30'

# Send test email job
api-email() {
  curl -s -X POST http://localhost:3000/api/jobs/send-email \
    -H "Content-Type: application/json" \
    -d "{\"to\":\"$1\",\"subject\":\"$2\",\"text\":\"$3\"}" | jq '.'
}
```

Reload:
```bash
source ~/.bashrc
```

---


