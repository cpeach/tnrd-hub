
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Subjects(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [subjects, setFormats] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _formats = await client({url:'/hashad/subjects/list',params:{method:"POST",body:{}}});
		
		if(isMounted){
			console.log(_formats)
			setFormats(_formats)
		}
		return () => (isMounted = false)
	},[]);
	
	if(subjects){
	
		l_data.list.columns[1].render = (p)=>{return <Link href={"/hashad/admin/preferences/subjects/"+p}>Edit</Link>}
		
		l_data.list.rows = subjects;
		
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





