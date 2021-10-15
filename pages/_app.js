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
    var ref = localStorage.getItem('user');
    
    var _user = await client({url:"/api-console/users/"+ref});
    var _apps = await client({url:"/api-console/applications"});
    if((_user.length<1&&router.pathname.indexOf('/signin')===-1)&&ref){
      router.push('/signin')
    }
    if(isMounted && _apps){
      setInterval(async() => {
          if(!(localStorage.getItem('user')&&localStorage.getItem('token'))){
            router.push('/signin')
          }else{
              var session = await client({url:"/api-console/validate"});
          }
      }, 20000);
      setUser(_user);
      setApps(_apps);
    }
    
    return () => (isMounted = false)
  },[]);
  
  let content = <></>;
  if(router.pathname.indexOf('/signin')>-1){
    content = <Component {...pageProps} />
  }else if(user&&apps){
    content = <Component {...pageProps} user={user} apps={apps}/>
  }
  return content;

}

