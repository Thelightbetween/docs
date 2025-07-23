import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="intercom-settings" strategy="beforeInteractive">
        {`
          window.intercomSettings = {
            app_id: 'z240m4p6',
            alignment: 'left',
            horizontal_padding: 20,
            vertical_padding: 20
          };
        `}
      </Script>
      <Script
        id="intercom-messenger"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var w = window;
              var ic = w.Intercom;
              if (typeof ic === "function") {
                ic('reattach_activator');
                ic('update', window.intercomSettings);
              } else {
                var d = document;
                var i = function() { i.c(arguments); };
                i.q = [];
                i.c = function(args) { i.q.push(args); };
                w.Intercom = i;
                function l() {
                  var s = d.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = 'https://widget.intercom.io/widget/z240m4p6';
                  var x = d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s, x);
                }
                if (document.readyState === 'complete') {
                  l();
                } else if (w.attachEvent) {
                  w.attachEvent('onload', l);
                } else {
                  w.addEventListener('load', l, false);
                }
              }
            })();
          `
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
