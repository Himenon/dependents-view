# dependents-view

## Usage

1. clone (or fork)

```bash
git clone https://github.com/Himenon/dependents-view.git
cd dependents-view
yarn
```

2. Generate token https://github.com/settings/tokens and set environment `GITHUB_TOKEN` value.
3. Change `scripts/Constants.ts` setting value.
4. Change `package.json` `homepage` value (your hosting site base path)
5. run
   ```bash
   # if organization
   yarn extract:package-json:org
   # if user
   yarn extract:package-json:user
   ```
6. Check `yarn start`
7. Build `yarn build`
8. Publish `yarn publish:site` (GitHub Pages Only)

## Start Development

```bash
yarn
yarn start # start debug server
```

## Build

```bash
yarn run build
```

### Release

```bash
yarn run deploy # default release: github pages
```

### Run server

```bash
yarn run serve
```

## Code Format

```bash
yarn run format
```

## License

MIT
