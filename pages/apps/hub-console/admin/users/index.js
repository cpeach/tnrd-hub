
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Users(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [users, setUsers] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _users  = await client({url:'/hub-console/users/list',params:{method:"POST","body":JSON.stringify({search:''})}});
		if(isMounted){
			setUsers(_users)
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		return await client({url:'/hub-console/users/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	const onDelete = async (p)=>{
		//return await client({url:'/hub-console/users/list',params:{method:"POST","body":JSON.stringify(p)}});
	}		
	if(users){

		l_data.list.columns[2].render = (p)=>{return p.toString().toUpperCase()}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/hub-console/admin/permissions/"+p}>Edit</Link>}
		
		l_data.list.rows   = users;
		
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





