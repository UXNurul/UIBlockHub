#!/bin/bash

# Get the latest tag from Git
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

# If no tag exists, start from v0.1.0
if [[ -z "$LATEST_TAG" ]]; then
  NEW_TAG="v0.1.0"
else
  # Extract version numbers
  IFS='.' read -r -a VERSION_PARTS <<< "${LATEST_TAG//v/}"
  
  # Increment patch version
  PATCH=$((VERSION_PARTS[2] + 1))
  NEW_TAG="v${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.$PATCH"
fi

# Create a new Git tag
git tag -a "$NEW_TAG" -m "Release $NEW_TAG"

# Push the new tag to the remote repository
git push origin "$NEW_TAG"

# Output the new tag
echo "✅ New tag created: $NEW_TAG"
