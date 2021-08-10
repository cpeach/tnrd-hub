import '../styles/globals.css'
import 'antd/dist/antd.compact.min.css';
import { useEffect } from 'react';
import Router from 'next/router';

export default function Hub({ Component, pageProps }) {

  useEffect(() => {
    //console.log(localStorage.getItem('user'))
    //localStorage.getItem('user')===null ? Router.push('/signin') : console.log(localStorage.getItem('user'))
  });


  return <Component {...pageProps} />
}

