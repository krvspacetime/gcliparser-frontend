# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This repository is a template for building modern web applications using React and Vite. It provides a solid foundation for developers looking to create responsive and interactive user interfaces with ease.

## Relevant Packages:

- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **Vite**: A build tool that offers a fast development environment and optimized production builds.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Packages Used

This repository is a template using the following packages:

### Dependencies:

- **React**: ^18.3.1
- **React DOM**: ^18.3.1
- **React Router DOM**: ^7.1.3
- **@mantine/core**: ^7.16.1
- **@mantine/hooks**: ^7.16.1
- **Tailwind CSS**: **^4.0.0** (highlighting the use of **Tailwind CSS 4.0**)

### DevDependencies:

- **@eslint/js**: ^9.17.0
- **@types/react**: ^18.3.18
- **@types/react-dom**: ^18.3.5
- **@vitejs/plugin-react**: ^4.3.4
- **eslint**: ^9.17.0
- **eslint-plugin-react-hooks**: ^5.0.0
- **eslint-plugin-react-refresh**: ^0.4.16
- **globals**: ^15.14.0
- **postcss**: ^8.5.1
- **postcss-preset-mantine**: ^1.17.0
- **postcss-simple-vars**: ^7.0.1
- **prettier**: ^3.4.2
- **prettier-plugin-tailwindcss**: ^0.6.11
- **typescript**: ~5.6.2
- **typescript-eslint**: ^8.18.2
- **vite**: ^6.0.5

Feel free to customize it as per your needs!
