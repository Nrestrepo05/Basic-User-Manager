import React from 'react';
import Head from 'next/head';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <main>
        <h1>{title}</h1>
        <div>
          {children}
        </div>
      </main>
      <style jsx>
        {`
          main {
            min-width: 80%;
            max-width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            margin: 10px 0;
          }
          div {
            min-width: 40%;
            max-width: 40%;
          }
        `}
      </style>
      <style jsx global>
        {`
          * {
            margin: 0;
            padding: 0;
          }
          body {
            background: #f1f1f1;
            font-family: system-ui, sans-serif;
          }
          #__next {
            min-width: 100%;
            max-width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
