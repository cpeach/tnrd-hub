
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Templates(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [templates, setTemplates] = useState();

	
	useEffect(async () => {
		let isMounted = true;
		let _templates = await client({url:'/expiring-patrons/templates/list',params:{"method":"POST","body":{}}});
		if(isMounted){
			setTemplates(_templates)
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		//return await client({url:'/hub-console/applications/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	
	if(templates){
		//l_data.list.columns[1].render = (p)=>{return p&&p.length>0?p.map(item=>item+''):'N/A'}
		l_data.list.columns[1].render = (p)=>{return <Link href={"/expiring-patrons/admin/templates/modify/"+p}>Edit</Link>}
		

		l_data.list.rows   = templates;
		
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





