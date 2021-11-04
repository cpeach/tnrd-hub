
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
	
	const [patrons, setPatrons] = useState();

	const validate = (email)=>{
    	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	}
	
	useEffect(async () => {
		let isMounted = true;
		let _patrons = await client({url:'/expiring-patrons/expiring/list',params:{"method":"POST","body":{}}});
		
		if(isMounted){
			setPatrons(_patrons)
			//var options = _departments.map(item=>({value:item._id,name:item.short,label:item.name}))
			
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		//return await client({url:'/hub-console/applications/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	
	if(patrons){
		l_data.list.columns[2].render = (p)=>{return p ? validate(p)+'': 'false'}
		l_data.list.columns[3].render = (p)=>{return p}
		
		l_data.list.columns[5].render = (p)=>{return <Link href={"/expiring-patrons/admin/expiring/modify/"+p}>Edit</Link>}
		

		l_data.list.rows   = patrons;
		
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





