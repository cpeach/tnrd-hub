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
    if(router.pathname.indexOf('/signin')===-1){
      console.log(ref)
      var _user = ref?await client({url:"/hub-console/users/"+ref}):undefined;
      var _apps = ref?await client({url:"/hub-console/applications"}):undefined;
      if(_user&&_user.length<1&&ref){
        router.push('/signin')
      }
      if(isMounted && _apps){
        setInterval(async() => {
            if(!(localStorage.getItem('user')&&localStorage.getItem('token'))){
              router.push('/signin');
            }else{
                await client({url:"/auth/validate"});
            }
        }, 20000);

        console.log(_user)
        console.log(_apps)
        setUser(_user);
        setApps(_apps);
      }
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

