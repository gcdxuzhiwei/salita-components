import { defineConfig } from 'dumi';
import type { IThemeConfig } from 'dumi/dist/client/theme-api/types';

const routers = [
  { title: '水印', link: '/watermark' },
  { title: '词云', link: '/word-cloud' },
];

export default defineConfig({
  title: 'salita-components',
  outputPath: 'docs-dist',
  styles: ['.dumi-default-header-left { width: 250px !important; }'],
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
