# hello | 你好

hello is an open-source notion-style based AI-powered language learning app.


## Tech Stack

- UI Framework: NextJS
- Styling: tailwindcss
- UI Components: chadcn
- Accessibility: radix UI
- Editor: tiptap
- Maps: Map Box

## Installation


1. Signup for Tiptap Account [ONE TIME]

2. Create `npmrc` and add the tiptap pro token [ONE TIME] and font awesome

```
@tiptap-pro:registry=https://registry.tiptap.dev/
//registry.tiptap.dev/:_authToken=YOUR_TOKEN_GOES_HERE

# for npm and yarn v1.22.19
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=FONT_AWESOME_GOES_HERE
```

3. Copy the template from `env.template` and save it in `env.local` and add map box api key

```sh
NEXT_PUBLIC_MAPBOX_TOKEN=TOKEN_GOES_HERE
```

4. Install dependencies [ONE TIME]

```
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

