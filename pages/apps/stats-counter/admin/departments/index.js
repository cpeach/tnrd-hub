
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld from './data.json';  // local data

export default function Departments(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [departments, setDepartments] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _departments = await client({url:'/stats-counter/departments/list',params:{method:'POST',body:{}}});
		
		if(isMounted){
			setDepartments(_departments)
		}
		return () => (isMounted = false)
	},[]);
	
	if(departments){

		l_data.list.columns[1].render = (p)=>{let count=p.groups.length;return <Link href={"/stats-counter/admin/departments/groups/"+p._id}>{"View ("+count+")"}</Link>}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/stats-counter/admin/departments/edit/"+p}>Edit</Link>}
		
		l_data.list.rows = departments;
		
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





