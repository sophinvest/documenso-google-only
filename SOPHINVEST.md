# Sophinvest Documenso build

This repository starts from upstream Documenso v2.15.0 (`c5efd34e95737f98f64c31214cebee80fb598f29`). The Sophinvest change adds `NEXT_PUBLIC_DISABLE_PASSKEY_SIGNIN=true` for the sender login. The flag removes the Passkey button, refuses creation of sender passkey sign-in options, and returns HTTP 403 from `/api/auth/passkey/authorize` before credential validation. It does not change recipient document authentication or Google OAuth.

The pinned upstream source also passed an unsupported `apiKey` option to `@ai-sdk/google-vertex`'s `createVertex`. This build removes that option to pass the app typecheck; it is unrelated to the Google OAuth provider used for sign-in.

The live Coolify service is `cloodmtwfefhifebdogdgzis` at `https://esign.sophinvest.com`. Its Postgres service and named volume must remain attached to the existing service. The Compose file in Coolify carries credentials and is not copied into this repository. Keep `NEXT_PUBLIC_DISABLE_EMAIL_PASSWORD_SIGNUP=true`, `NEXT_PUBLIC_DISABLE_EMAIL_PASSWORD_SIGNIN=true`, and `NEXT_PRIVATE_ALLOWED_SIGNUP_DOMAINS=sophinvest.com` on the service. Keep the existing Google OAuth configuration and all other environment values intact.

To update this build, merge an upstream release into the Sophinvest repository, resolve the three passkey guards, and run the project build and authentication checks. Deploy the resulting image through the existing Coolify service, then verify `/api/health`, `/signin`, `/signup`, and both passkey endpoints. Do not create a synthetic production account for verification.
