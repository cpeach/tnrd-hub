
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Notified(props) { 

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [notified, setNotified] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _notified  = await client({url:'/expiring-patrons/notified/patrons/'+_id});
		
		if(isMounted){
			setNotified(_notified)
		}
		return () => (isMounted = false)
	},[]);
	

		
	if(notified){
		
		l_data.list.columns[3].render = (p)=>{return !p?"Good":p}
		
		l_data.list.rows   = notified;
		
		let data = {};
		data.content  = 
					(
						<Page><List data={l_data.list} ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





