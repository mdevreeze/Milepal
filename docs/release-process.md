# Release Process

## Automated Builds and Releases

Milepal uses GitHub Actions to automate the build and release process. This document describes how the process works and how to create a new release.

## Continuous Integration

This project uses a tag-based release system. CI builds are only triggered when a tag is pushed, not on every commit to the main branch.

## Creating a Release

To create a new release:

1. Update the version number in `Milepal.csproj`:
   ```xml
   <ApplicationDisplayVersion>x.y.z</ApplicationDisplayVersion>
   <ApplicationVersion>n</ApplicationVersion>
   ```

2. Commit these changes:
   ```bash
   git add Milepal.csproj
   git commit -m "Bump version to x.y.z"
   ```

3. Create and push a tag:
   ```bash
   git tag vx.y.z
   git push origin vx.y.z
   ```

Pushing a tag starting with `v` will trigger the release workflow, which:

1. Builds the web assets
2. Signs the APK using the keystore configured in GitHub Secrets
3. Creates a GitHub Release with the signed APK attached

## Required Secrets

To enable signed releases, you need to set up the following secrets in your GitHub repository:

- `ANDROID_KEYSTORE_BASE64`: Your Android keystore file encoded as base64
- `KEYSTORE_PASSWORD`: The password for your keystore
- `KEY_ALIAS`: The alias of the key in your keystore
- `KEY_PASSWORD`: The password for your key

### Generating a Keystore

If you need to generate a new keystore:

```bash
keytool -genkey -v -keystore milepal.jks -alias milepal -keyalg RSA -keysize 2048 -validity 10000
```

### Converting Keystore to Base64

```bash
base64 -w 0 milepal.jks > milepal.jks.base64
```

Then copy the contents of the `.base64` file to your `ANDROID_KEYSTORE_BASE64` secret.

## Manual Build and Sign

If you need to build and sign manually, follow the instructions in the README:

```bash
dotnet publish -c Release -f net9.0-android -p:AndroidPackageFormats=apk -p:AndroidSigningKeyStore={keystore-file} -p:AndroidSigningKeyAlias={keyalias} -p:AndroidSigningKeyPass={password} -p:AndroidSigningStorePass={password}
```

## Troubleshooting

If the automated build is failing:

1. Check the GitHub Actions logs for specific errors
2. Verify that all secrets are configured correctly
3. Ensure the keystore is valid and the passwords are correct
