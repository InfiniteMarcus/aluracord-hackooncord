import Head from 'next/head';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
      <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }

    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }

    a {
      color: white;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    ::-webkit-scrollbar {
      width: 8px;
      background-color: ${appConfig.theme.colors.neutrals['700']};
      border-radius: 10px;
    }
  
    ::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }
    
    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #4a4d52;
      border-radius: 10px;
    }
  `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Hackooncord</title>
          <link rel="icon" href="assets/imgs/favicon.ico" />
          <meta name="description" content="Aluracord versão HackoonSpace"></meta>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
  );
}
