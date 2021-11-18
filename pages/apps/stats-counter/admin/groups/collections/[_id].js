
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Collections(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query
	
	const [collections, setCollections] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _collections = await client({url:'/stats-counter/collections/list',params:{method:'POST',body:{filters:{department:_id}}}});
		
		if(isMounted){setCollections(_collections)}
		return () => (isMounted = false)
	},[]);
	

		
	if(collections){

		//l_data.list.columns[1].render = (p)=>{let count=p.collections.length;return <Link href={"/stats-counter/admin/departments/collections/"+p._id}>{"View ("+count+")"}</Link>}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/stats-counter/admin/collections/departments/"+p}>Edit</Link>}
		
		l_data.list.rows   = collections;
		
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





