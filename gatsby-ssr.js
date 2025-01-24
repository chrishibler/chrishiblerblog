/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
const React = require("react");

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` });

  // Add something into <head>
  setHeadComponents([
    <script
      key="google-ads"
      type="text/javascript"
      src="https://www.googletagmanager.com/gtag/js?id=AW-16828308323"
    />,
    <script
      key="google-ads-config"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16828308323'); 
      `,
      }}
    />,
  ]);
};
