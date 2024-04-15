import { defineConfig } from 'dumi';
import type { IThemeConfig } from 'dumi/dist/client/theme-api/types';

const routers = [
  { title: '使用说明', link: '/' },
  { title: '水印', link: '/watermark' },
  { title: '词云', link: '/word-cloud' },
];

export default defineConfig({
  title: 'salita-components',
  outputPath: 'docs-dist',
  styles: ['.dumi-default-header-left { width: 250px !important; }'],
  base: '/salita-components/',
  publicPath: '/salita-components/',
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  themeConfig: {
    name: 'salita-components',
    nav: [],
    sidebar: routers.reduce(
      (pre, { link }) => {
        pre![link] = [{ children: routers }];
        return pre;
      },
      {
        '/': [{ children: routers }],
      } as IThemeConfig['sidebar'],
    ),
  },
});
