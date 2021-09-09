import '../styles/globals.css'
import 'antd/dist/antd.compact.min.css';
import { useEffect,useState } from 'react';
import client from '/scripts/client-api.js';
import {useRouter} from 'next/router';

export default function Hub({ Component, pageProps }) {

  const [user, setUser] = useState();
  const [apps, setApps] = useState();
  const router = useRouter();

  useEffect(async () => {
    let isMounted = true;
    var ref   = localStorage.getItem('user');
    var _user = await client({url:"/api-console/users/"+ref});
    var _apps = await client({url:"/api-console/applications"});
    if(_user.length<1&&router.pathname!=='/signin'){router.push('/signin')}
    if(isMounted){
      setUser(_user);
      setApps(_apps);
    }
    return () => (isMounted = false)
  },[]);
  
  return <Component {...pageProps} user={user} apps={apps} />

}

