
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld from './data.json';  // local data

export default function Roles(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [roles, setRoles] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _roles  = await client({url:'/hub-console/roles'});
		if(isMounted){
			setRoles(_roles)
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		return await client({url:'/hub-console/roles/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	const onDelete = async (p)=>{
		//return await client({url:'/hub-console/roles/list',params:{method:"POST","body":JSON.stringify(p)}});
	}		
	if(roles){
		l_data.list.columns[0].render = (p)=>{return <img src={p.image_meta?p.image_meta.url:""} />}
		l_data.list.columns[1].render = (p)=>{return p.name}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/hub-console/admin/roles/modify/"+p}>Edit</Link>}
		l_data.list.rows = roles;
		
		let data = {};
		data.content  = 
					(
						<Page><List data={l_data.list} onFilter={onChange} onSearch={onChange}><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





