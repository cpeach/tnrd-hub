
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
	
	const [authors, setFormats] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _authors = await client({url:'/hashad/authors/list',params:{method:"POST",body:{}}});
		
		if(isMounted){
			setFormats(_authors)
		}
		return () => (isMounted = false)
	},[]);
	
	if(authors){
	
		l_data.list.columns[1].render = (p)=>{return <Link href={"/hashad/admin/preferences/authors/"+p}>Edit</Link>}
		
		l_data.list.rows = authors;
		
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





