# STRUCTURE

Web制作会社 STRUCTURE のコーポレートサイトです。

## Stack

- React
- Vite
- TypeScript

## Deployment

GitHub Pages への公開は [ .github/workflows/deploy-pages.yml ] に固定しています。

- `main` へ push すると GitHub Actions が `npm ci` → `npm run build` → Pages deploy を実行
- Vite の公開ベースパスは [vite.config.ts](vite.config.ts) で `/VELIRO/` に設定済み
- SPA の直リンク復帰は [public/404.html](public/404.html) で処理

初回だけ GitHub 側で以下を確認してください。

- Repository Settings → Pages → Source が `GitHub Actions`
- 公開先 URL は `https://structurebeforewords.github.io/VELIRO/`

## Git Update

最新版に保つための最短手順は [GIT_WORKFLOW.md](/home/sairen/デスクトップ/SAIREN/ウェブサイト制作会社/ウェブサイト会社/GIT_WORKFLOW.md) を参照してください。

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
