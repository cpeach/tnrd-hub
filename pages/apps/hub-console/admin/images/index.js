
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Images(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [images, setImages] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _images = await client({url:'/hub-console/images/list',params:{method:"POST","body":{}}});
		if(isMounted){
			setImages(_images)
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		return await client({url:'/hub-console/images/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	
	if(images){
		
		//l_data.list.filters[0].options = departments || [];

		l_data.list.columns[0].render = (p)=>{return <img src={p} />}
		l_data.list.columns[3].render = (p)=>{return p.toString()}
		l_data.list.columns[5].render = (p)=>{return <Link href={"/hub-console/admin/images/modify/"+p}>Edit</Link>}

		l_data.list.rows = images;
		
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





