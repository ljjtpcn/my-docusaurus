// @ts-check
const path = require('path')
const beian = '湘 ICP 备 2021016514 号'
const friendLinks = [
  {
    label: 'Bruce12138',
    to: 'http://www.bruce12138.com',
  },
  {
    label: '峰华前端工程师',
    to: 'https://zxuqian.cn/',
  },
]
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TwoPair',
  titleDelimiter: '-',
  url: 'https://blog.twopair.cn',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'ljjtpcn', // Usually your GitHub org/user name.
  projectName: 'ljjtpcn', // Usually your repo name.
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: 'img/TwoPair.jpg',
    announcementBar: {
      id: 'announcementBar-2', // Any value that will identify this message.
      content: `代码能重写，人不能重来`,
    },
    metadata: [
      {
        name: 'keywords',
        content: 'TwoPair, TwoPair, blog, javascript, typescript, python ,node, react, vue, web, 前端, 后端',
      },
    ],
    hideableSidebar: true,
    navbar: {
      title: 'TwoPair',
      logo: {
        alt: 'TwoPair',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      items: [
        {
          label: '标签',
          to: 'tags',
          position: 'right',
        },
        {
          label: '归档',
          to: 'archive',
          position: 'right',
        },
        {
          label: '学习',
          position: 'right',
          items: [
            {
              label: '技术笔记',
              to: 'docs/skill/',
            },
            // {
            //   label: "个人推荐",
            //   to: "docs/recommend",
            // },
          ],
        },
        // {
        //   label: '小工具',
        //   position: 'right',
        //   items: [
        //     {
        //       label: '资源导航',
        //       to: '/resources', // 'https://nav.TwoPair.cn'
        //     },
        //     {
        //       label: 'JS代码混淆与还原',
        //       to: 'https://deobfuscator.TwoPair.cn', // 'https://deobfuscator.TwoPair.cn'
        //     },
        //     {
        //       label: 'CyberChef在线加解密',
        //       to: 'http://cipher.TwoPair.cn', // 'http://cipher.TwoPair.cn'
        //     },
        //     {
        //       label: 'TwoPair在线工具',
        //       to: 'http://tools.TwoPair.cn', // 'http://tools.TwoPair.cn'
        //     },
        //   ],
        // },
        // {
        //   label: '实战项目',
        //   position: 'right',
        //   to: '/project',
        // },
      ],
    },
    // algolia: {
    //   apiKey: '7e52a6048ac103ac0b90467e87a01912',
    //   appId: '9S549UEBU1',
    //   indexName: 'TwoPair',
    // },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '技术博客',
              to: '/#homepage_blogs',
            },
            {
              label: '技术笔记',
              to: 'docs/skill',
            },
            // {
            //   label: '实战项目',
            //   to: 'project',
            // },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '首页',
              to: '/',
            },
            // {
            //   label: '关于我',
            //   to: '/about',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/ljjtpcn',
            },
            // {
            //   label: '掘金',
            //   href: 'https://juejin.cn/user/1565318510545901',
            // },
          ],
        },
        {
          title: '友情链接',
          items: friendLinks,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TwoPair Built with Docusaurus.<p><a data-from="10680" href="https://webify.cloudbase.net/" target="_blank" rel="nofollow noopener noreferrer">CloudBase Webify</a> 提供<a data-text-link="570_1871549" data-from="10680" href="https://cloud.tencent.com/product/wh?from=10680" target="_blank">网站托管服务</a></p><a href="http://beian.miit.gov.cn/" >${beian}</a>`,
      //</p><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="/img/creative-commons-license-icon.png" /></a><br />本站所有内容遵循 <a rel="license" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans" >CC BY-NC 4.0 协议</a>，转载须注明署名和出处，且不可用于商业用途。若与其他同步平台协议冲突，以本网站为准。
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php'],
      // defaultLanguage: "javascript",
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    zoomSelector: '.markdown :not(em) > img',
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    // googleAnalytics: {
    //   trackingID: "UA-118572241-1",
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
    // gtag: {
    //   trackingID: "G-6PSESJX0BM",
    //   // Optional fields.
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
          // editUrl: "https://github.com/TwoPair/TwoPair.cn/tree/master",
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        blog: {
          path: 'blog',
          routeBasePath: '/',
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 5,
          postsPerPage: 10,
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          feedOptions: {
            type: 'all',
            title: 'TwoPair',
            copyright: `Copyright © ${new Date().getFullYear()} TwoPair Built with Docusaurus.<a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
          },
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        // debug: true,
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    path.resolve(__dirname, './src/plugin/plugin-baidu-analytics'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    // path.resolve(__dirname, "./src/plugin/plugin-onesignal-push"),
    // "docusaurus2-dotenv",
    '@docusaurus/plugin-ideal-image',
    path.resolve(__dirname, './src/plugin/plugin-image-zoom'),
    path.resolve(__dirname, './src/plugin/plugin-latest-docs'),
    // [
    //   "@easyops-cn/docusaurus-search-local",
    //   {
    //     hashed: true,
    //     // indexPages: true,
    //     blogRouteBasePath: "/",
    //     language: ["en", "zh"],
    //   },
    // ],
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: true,
    //     offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
    //     pwaHead: [
    //       {
    //         tagName: 'link',
    //         rel: 'icon',
    //         href: '/img/TwoPair.jpg',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'manifest',
    //         href: '/manifest.json', // 您的 PWA Manifest
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'theme-color',
    //         content: 'rgb(51 139 255)',
    //       },
    //     ],
    //   },
    // ],
  ],
  stylesheets: [
    // {
    //   rel: "preconnect",
    //   href: "https://fonts.gstatic.com",
    //   type: "text/css",
    // },
    /* {
      href: "/katex/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    }, */
    // {
    //   href: "https://fonts.font.im/css?family=Raleway:500,700&display=swap",
    //   type: "text/css",
    //   rel: "stylesheet",
    // },
    // {
    //   href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
    //   type: "text/css",
    //   rel: "stylesheet",
    // },
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },
  onBrokenLinks: 'ignore',
}

module.exports = config
