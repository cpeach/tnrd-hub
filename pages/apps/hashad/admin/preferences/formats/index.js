
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Formats(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [formats, setFormats] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _formats = await client({url:'/hashad/formats/list',params:{method:"POST",body:{}}});
		
		if(isMounted){
			console.log(_formats)
			setFormats(_formats)
		}
		return () => (isMounted = false)
	},[]);
	
	if(formats){
	
		l_data.list.columns[0].render = (p)=>{return p?p:'--'}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/hashad/admin/preferences/formats/"+p}>Edit</Link>}
		
		l_data.list.rows = formats;
		
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





