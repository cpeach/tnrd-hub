
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Notified(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [notified, setNotified] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _notified  = await client({url:'/expiring-patrons/notified/'});
		
		if(isMounted){
			setNotified(_notified)
		}
		return () => (isMounted = false)
	},[]);
	

		
	if(notified){
		l_data.list.columns[0].render = (p)=>{return p.split('T')[0]}
		l_data.list.columns[1].render = (p)=>{return p.length +""}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/expiring-patrons/admin/notified/patrons/"+p}>View</Link>}
		
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





