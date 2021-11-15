
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Expiring(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [patrons, setPatrons]     = useState();
	const [templates, setTemplates] = useState();

	
	useEffect(async () => {
		let isMounted = true;
		let _patrons   = await client({url:'/expiring-patrons/expiring/list',params:{"method":"POST","body":{}}});
		let _templates = await client({url:'/expiring-patrons/templates/'});
		
		if(isMounted){
			setPatrons(_patrons);
			setTemplates(_templates)
			//var options = _departments.map(item=>({value:item._id,name:item.short,label:item.name}))
			
		}
		return () => (isMounted = false)
	},[]);
	
	const onFilter = async (p)=>{
		return await client({url:'/expiring-patrons/expiring/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	
	if(patrons&&templates){
		l_data.list.columns[2].render = (p)=>{return p.toString()}
		l_data.list.columns[3].render = (p)=>{return p}
		l_data.list.columns[4].render = (p)=>{return p.name}
		l_data.list.columns[6].render = (p)=>{return <Link href={"/expiring-patrons/admin/expiring/modify/"+p}>Edit</Link>}
		
		l_data.list.filters[1].options = templates.map(item=>({value:item._id,name:item.name,label:item.name}));

		l_data.list.rows   = patrons;
		
		let data = {};
		data.content  = 
					(
						<Page><List data={l_data.list} onFilter={onFilter}><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





