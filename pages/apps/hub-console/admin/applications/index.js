
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Applications(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [applications, setApplications] = useState();
	const [departments, setDepartments] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _applications = await client({url:'/hub-console/applications'});
		let _departments  = await client({url:'/hub-console/departments'});
		if(isMounted){
			setApplications(_applications)
			var options = _departments.map(item=>({value:item._id,name:item.short,label:item.name}))
			setDepartments(options)
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		return await client({url:'/hub-console/applications/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	
	if(applications&&departments){
		
		l_data.list.filters[0].options = departments || [];
		l_data.list.columns[0].render = (p)=>{return <img src={p.url} />}
		l_data.list.columns[3].render = (p)=>{let vals = p.map(item=>(item.name));return vals.join()}
		l_data.list.columns[4].render = (p)=>{return <Link href={"/hub-console/admin/applications/modify/"+p}>Edit</Link>}

		l_data.list.rows   = applications;
		
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





