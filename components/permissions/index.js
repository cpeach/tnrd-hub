import {useRouter} from 'next/router';

export default function Permissions(props){
   const router = useRouter();
   
   let role,app;
   let app_name = router.route.split("/")[1];
   if(props.apps && props.apps.length>0){
   
      props.apps.map((item,i)=>{
         app = item.short === app_name ? props.user.applications[item._id] : app;
      }) 
      role = app ? app.role.name : app;
   }
   

   return (
     <>    
        {props.children}
     </>
   )
}