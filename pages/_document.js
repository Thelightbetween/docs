import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Intercom settings script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.intercomSettings = {
                app_id: 'z240m4p6',
                alignment: 'left',
                horizontal_padding: 20,
                vertical_padding: 20
              };
            `
          }}
        />
      </body>
    </Html>
  );
}
