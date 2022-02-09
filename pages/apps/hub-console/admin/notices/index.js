

import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Locations(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const data = JSON.parse(JSON.stringify(ld))
	
	const [items, setItems] = useState();
	
	
	useEffect(async () => {
		let isMounted = true;
		let _items = await client({url:'/hub-console/notices/list',params:{method:'POST',body:{}}});
		
		if(isMounted){
			setItems(_items);
			
		}
		return () => (isMounted = false)
	},[]);

	

	if(items){

		console.log(items)
		l_data.list.columns[0].render = (p)=>{return props.apps.map(item=>{if(item._id==p){return item.name}})}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/hub-console/admin/notices/edit/"+p}>Edit</Link>}
		
		l_data.list.rows   = items;
		
		
		
		l_data.content  = 
					(
						<Page><List data={l_data.list} ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={l_data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





