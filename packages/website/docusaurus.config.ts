import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const baseUrl = '/maxGraph/';

const config: Config = {
  title: 'maxGraph',
  // The "generated" directory contains the demo (storybook) and the API documentation (typedoc)
  staticDirectories: ['generated', 'static'],
  tagline:
    'A TypeScript library which can display and allow interaction with vector diagrams.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://maxgraph.github.io/', // mainly used for sitemap.xml
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'maxGraph', // Usually your GitHub org/username.
  projectName: 'maxGraph', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Enable rspack build introduce in 3.6.0, see https://docusaurus.io/blog/releases/3.6#adoption-strategy
  future: {
    experimental_faster: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/maxGraph/maxGraph/tree/main/packages/website/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    // announcementBar: {
    //   content:
    //     '⚠️ This is a <b>work in progress</b>, the content of the original <i>mxGraph</i> documentation will be progressively migrated here ⚠️',
    //   backgroundColor: 'rgb(255, 248, 230)',
    //   isCloseable: false,
    // },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'maxGraph',
      logo: {
        alt: 'maxGraph Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Documentation',
          position: 'left',
          sidebarId: 'docsSidebar',
          type: 'docSidebar',
        },
        {
          href: `${baseUrl}demo/`,
          label: 'Demo',
          position: 'left',
          target: '_blank',
        },
        {
          href: `${baseUrl}api-docs/`,
          label: 'API',
          position: 'left',
          target: '_blank',
        },
        {
          href: 'https://github.com/maxGraph/maxGraph',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Content',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              href: `${baseUrl}demo/`,
              label: 'Demo',
              target: '_blank',
            },
            {
              href: `${baseUrl}api-docs/`,
              label: 'API',
              target: '_blank',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Questions',
              href: 'https://github.com/maxGraph/maxGraph/discussions/categories/q-a',
            },
            {
              label: 'Issues',
              href: 'https://github.com/maxGraph/maxGraph/issues',
            },
            {
              label: 'Announces',
              href: 'https://github.com/maxGraph/maxGraph/discussions/categories/announces',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/maxGraph/maxGraph',
            },
          ],
        },
      ],
      copyright: `Copyright © 2021-${new Date().getFullYear()} - The maxGraph project Contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // docs/manual/getting-started -> /docs/getting-started
          {
            to: '/docs/getting-started',
            from: '/docs/manual/getting-started',
          },
          // docs/manual/model-and-cells -> /docs/manual/model-and-transactions
          {
            to: '/docs/manual/model-and-transactions',
            from: '/docs/manual/model-and-cells',
          },
        ],
      },
    ],
  ],
};

export default config;
