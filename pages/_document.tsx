import { ColorModeScript } from '@chakra-ui/react';
import type { DocumentContext } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import * as serverTiming from 'nextjs/utils/serverTiming';

import theme from 'theme';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = async() => {
      const start = Date.now();
      const result = await originalRenderPage();
      const end = Date.now();

      serverTiming.appendValue(ctx.res, 'renderPage', end - start);

      return result;
    };

    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          { /* FONTS */ }
          {/*<link*/}
          {/*  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"*/}
          {/*  rel="stylesheet"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"*/}
          {/*  rel="stylesheet"*/}
          {/*/>*/}

          { /* eslint-disable-next-line @next/next/no-sync-scripts */ }
          <script src="/envs.js"/>

          { /* FAVICON */ }
          <link rel="icon" href="/favicon/favicon.ico"/>
          <script type="module" dangerouslySetInnerHTML={{ __html: ` // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries

            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
            apiKey: "AIzaSyDLRjlXJtYuF-5hEMdGCMkTWbaBxim_c9s",
            authDomain: "match-98571.firebaseapp.com",
            projectId: "match-98571",
            storageBucket: "match-98571.appspot.com",
            messagingSenderId: "607147760826",
            appId: "1:607147760826:web:b7fd323b904120438a3683",
            measurementId: "G-271SGD6JLY"
          };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);` }}></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={ theme.config.initialColorMode }/>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
