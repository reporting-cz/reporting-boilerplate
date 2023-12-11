cd /home/rp-boilerplate
# yarn config set 'npmRegistries["//pkgs.dev.azure.com/reporting-cz/_packaging/reporting-feed/npm/registry"]' --json '{"npmAlwaysAuth": true, "npmAuthIdent": "$RP_NPM_AUTH_IDENT"}' --home
yarn install
yarn workspace @reporting/bp-frontend dev
