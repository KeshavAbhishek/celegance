#!/bin/bash

# ================================
# Celegance Production Deploy
# ================================

# SERVER CONFIG
SERVER_USER="ankit9102783437"
SERVER_IP="35.244.2.133"
SERVER_DIR="/var/www/html"
BRANCH="master"
SSH_KEY="$HOME/.ssh/id_ed25519"

echo "🚀 Starting deployment..."

# --- Step 1: Push to GitHub ---
echo "➡️  Committing & pushing to GitHub..."
git add .
git commit -m "Deploy $(date)" || echo "ℹ️  No new changes to commit"
git push origin ${BRANCH} || { echo "❌ Git push failed"; exit 1; }

# --- Step 2: Pull on server ---
echo "🔗 Connecting to server & deploying..."
ssh -i ${SSH_KEY} \
    -o IdentitiesOnly=yes \
    ${SERVER_USER}@${SERVER_IP} << EOF

  echo "📂 Moving to project directory..."
  cd ${SERVER_DIR} || exit 1

  echo "⬇️  Pulling latest code..."
  git pull origin ${BRANCH} || exit 1

  echo "♻️  Reloading NGINX..."
  sudo systemctl reload nginx

  echo "✅ Server deployment complete"
EOF

echo "🎉 Deployment finished successfully!"
