import {useRouter} from 'next/router';

export default function Permission(props){
   const router = useRouter();
   console.log(props.apps)
   console.log(router.route.split("/"));
   // get application

   return (
     <>    
        {props.children}
     </>
   )
}