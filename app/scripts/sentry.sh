#!/bin/bash
set -eo pipefail

export SENTRY_ENVIRONMENT="production"
export SENTRY_RELEASE=$(sentry-cli releases propose-version)
echo "=> Sentry Release: $SENTRY_RELEASE :: $SENTRY_ENVIRONMENT"

# Configure the release and upload source maps
# sentry-cli releases new $SENTRY_RELEASE --project $SENTRY_PROJECT
# sentry-cli releases set-commits --auto $SENTRY_RELEASE
# sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps ".next" --url-prefix "~/_next" --rewrite --verbose --validate
# sentry-cli releases deploys $SENTRY_RELEASE new -e $SENTRY_ENVIRONMENT
# sentry-cli releases finalize $SENTRY_RELEASE
