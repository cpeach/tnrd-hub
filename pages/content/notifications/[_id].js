

import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import moment  from 'moment';
import { Empty,Badge } from 'antd';

import ld      from './data.json';  // local data

export default function TNRD(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const router = useRouter();
	const {_id}  =  router.query;

	const [items, setItems] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _items = await client({url:'/hub-console/notices/patron/'+_id});
		
		if(isMounted){
			setItems(_items);
		}
		return () => (isMounted = false)
	},[]);

	

	if(items){

		l_data.list.columns[0].render = (p)=>{return <Badge status={p===0?"green":"gold"} />}
		l_data.list.columns[1].render = (p)=>{var date = p.split('T');return moment(date,"YYYY-MM-DD").format("LL") +" @"+p.split("T")[1].split('.')[0]}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/content/notifications/details/"+p}>View</Link>}
		
		l_data.list.rows   = items;
		
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





