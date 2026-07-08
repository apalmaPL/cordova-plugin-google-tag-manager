# Cordova Google Tag Manager Plugin

A Cordova plugin that integrates the native **Google Tag Manager for Mobile Apps** SDK into iOS and Android applications.

The plugin is designed to work alongside existing Firebase Analytics integrations. It does **not** expose any JavaScript API to log events. Instead, it installs the native GTM SDK so that Firebase Analytics events can be consumed by a Google Tag Manager Mobile Apps container.

## Features

- Native Google Tag Manager SDK integration
- Android support
- iOS support
- Compatible with existing Firebase Analytics implementations
- No JavaScript API required
- Supports bundled GTM containers

## Requirements

- Cordova
- Firebase Analytics already integrated in the application
- Google Tag Manager Mobile Apps container
- Android and/or iOS platforms


## Container Files

The plugin expects the GTM container JSON file to be included inside the plugin resources.

### Android

Place the container file in:

```
resources/container/android/
```

Example:

```
resources/container/android/GTM-XXXXXXX.json
```

During the Cordova build, the plugin copies the container to:

```
platforms/android/app/src/main/assets/container/
```

which is where the Google Tag Manager SDK expects it.

### iOS

Place the same container file in:

```
resources/container/ios/
```

Example:

```
resources/container/ios/GTM-XXXXXXX.json
```

During the Cordova build, the plugin copies the folder into the generated iOS project and makes it available to the application bundle.

## How it works

The plugin only installs the native Google Tag Manager SDK and bundles the default container.

Firebase Analytics continues to be responsible for logging events.

```
Application
      │
      ▼
Firebase Analytics SDK
      │
      ├────────► Firebase Analytics
      │
      └────────► Google Tag Manager
                      │
                      ▼
                  GTM Tags
```

No additional JavaScript calls are required.

## Using Google Tag Manager

1. Create a **Google Tag Manager for Mobile Apps** container.
2. Configure the desired tags and triggers.
3. Publish the container.
4. Download the container JSON.
5. Replace the JSON file inside:

```
resources/container/android/
resources/container/ios/
```

6. Rebuild the application.

## Firebase

This plugin does **not** configure Firebase Analytics.

Firebase Analytics must already be installed and configured before using this plugin.

Any events logged through Firebase Analytics will be available for Google Tag Manager Mobile Apps triggers.

## Debugging

### Android

Use Logcat and filter by:

```
GoogleTagManager
Firebase
```

### iOS

Use the macOS **Console** application or Xcode console and filter by:

```
GoogleTagManager
Firebase
```

If the GTM SDK cannot find the bundled container, it will log:

```
GoogleTagManager warning: No default container found.
```

This usually indicates that the container JSON is missing from the application bundle.


## Notes

This plugin intentionally exposes no JavaScript API.

All analytics events should continue to be logged through the existing Firebase Analytics plugin.

Google Tag Manager automatically evaluates those events and executes any configured tags.

## License

MIT
