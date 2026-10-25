#!/usr/bin/env bash

# ==============================================================================
# DARC Design Team — Database Backup Decryptor & Restoration Tool
# Usage: ./scripts/restore-backup.sh <backup_file.sql.gz.enc>
# ==============================================================================

set -e

ENCRYPTED_FILE="$1"

if [ -z "$ENCRYPTED_FILE" ]; then
  echo "Usage: $0 <path_to_backup.sql.gz.enc>"
  exit 1
fi

if [ ! -f "$ENCRYPTED_FILE" ]; then
  echo "Error: File not found: $ENCRYPTED_FILE"
  exit 1
fi

CHECKSUM_FILE="${ENCRYPTED_FILE}.sha256"
if [ -f "$CHECKSUM_FILE" ]; then
  echo "🔍 Verifying SHA-256 checksum..."
  if sha256sum -c "$CHECKSUM_FILE" 2>/dev/null || shasum -a 256 -c "$CHECKSUM_FILE"; then
    echo "✅ Checksum verified: File is authentic and has not been tampered with."
  else
    echo "❌ Integrity check failed! The backup file may be corrupted or altered."
    exit 1
  fi
fi

OUTPUT_FILE="${ENCRYPTED_FILE%.enc}"
SQL_FILE="${OUTPUT_FILE%.gz}"

echo "🔓 Decrypting $ENCRYPTED_FILE with AES-256-CBC..."
openssl enc -d -aes-256-cbc -salt -pbkdf2 -iter 100000 \
  -in "$ENCRYPTED_FILE" \
  -out "$OUTPUT_FILE"

echo "📦 Decompressing..."
gunzip -k -f "$OUTPUT_FILE"

echo "✨ Success! Decrypted SQL dump ready at: $SQL_FILE"
echo "To restore into Supabase, you can run:"
echo "psql \"\$SUPABASE_DB_URL\" < \"$SQL_FILE\""
