## Getting Started

Grant permission
```bash
chmod 777 ./android/gradlew ./android/gradlew.bat
```

Install native packages
```bash
cd ios && pod install && cd ../
```

Install packages
```bash
yarn install
```

Config .env for authentication: the information get from our exported API project
```
API_URL=
APP_CLIENT_ID=
APP_CLIENT_SECRET=
```

Run on your local
```bash
yarn ios
yarn android
```

Buil production

android: https://reactnative.dev/docs/signed-apk-android
ios: https://reactnative.dev/docs/publishing-to-app-store

## Structure

```
src
   → assets (the bridge to get assets ⇒ import { assets } from ‘@asses/index’ ⇒ assets(’name of asset’)
   → components
       → atoms
       → molecules
           → AppButton
               → AppButton
               → index.ts
               → style.ts
       → organisms
   → constants
   → i18n
   → interfaces
   → routes
   → pages
      → Home
          → Home.tsx
          → index.ts
          → style.ts
   → states: zunstand stores
   → hoos
   → services: react-query functions or hooks
   → utils
```

## Requirement

```
Binaries:
  Node:
    version: 18.19.1
  Yarn:
    version: 1.22.19
  npm:
    version: 8.18.0
  Watchman:
    version: 2024.01.22.00
Managers:
  CocoaPods:
    version: 1.15.2
IDEs:
  Android Studio: 2021.3
  Xcode: 14.3.1
  xcode-select: 2397
Languages:
  Java:
    version: 17.0.10
  Ruby:
    version: 3.2.2
npmPackages:
  "@react-native-community/cli": Not Found
  react:
    installed: 18.2.0
    wanted: 18.2.0
  react-native:
    installed: 0.73.6
    wanted: 0.73.6
Android:
  hermesEnabled: true
  newArchEnabled: false
iOS:
  hermesEnabled: true
  newArchEnabled: false
```

## Guildeline
### 1. Change app name or bundle
```sh
npx react-native-rename@latest "new_name" -b "bundle_identifier"
```
https://github.com/junedomingo/react-native-rename
### 2. Generate app icon
```sh
npx icon-set-creator create ./path/to/icon.png
```
https://github.com/martiliones/icon-set-creator?tab=readme-ov-file#-cli-parameters-
### 3. Generate splash screen
```sh
yarn react-native generate-bootsplash src/assets/svgs/logo.svg \
  --platforms=android,ios,web \
  --background=F5FCFF \
  --logo-width=100 \
  --assets-output=assets \
  --flavor=main \
  --html=index.html
```
https://github.com/zoontek/react-native-bootsplash?tab=readme-ov-file#assets-generation
### 4. Navigation

Supported navigation function over services/navigate
```javascript
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedStackParamList } from 'routes'

const navigation = useNavigation<NativeStackNavigationProp<UnAuthenticatedStackParamList>>()


navigation.push()
navigation.navigate()
navigation.goBack()
```

### 5. Service
Service support function based on business model

How to use service for fetch data from client side
```javascript
import { useQueryExamples, GetExamplesParamsType } from 'services/example'
// Define state for query params
const [params, setParams] = useState<{ page: number }>()

// Define query service and pass params to it.
const { data, isPending } = useQueryExamples(params, { enabled: true })
// filterPostQuery.isPending
// filterPostQuery.error
// filterPostQuery.data


// Define action for queries change to trigger refetch data if needed
const handleQueryChange = (newQuery: Partial<GetExamplesParamsType>) => {
  setFilterPostsetParamsarams(newQuery)
}

```


How to use service for mutation data
```javascript
// Define mutation service
const createPostMutation = useCreatePostMutation();

// Call mutation
const handleCreatePost = async (data: PostData) => {
  try {
    const response = await createPostMutation.mutateAsync(data);
  } catch (e: unknown) {}
};
// State of mutation can be get over "createPostMutation"
// createPostMutation.isPending
// createPostMutation.error
// createPostMutation.data
```                                                         |
