
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Items(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const router = useRouter()
  	const query = router.query

	const [items, setItems] = useState();

	useEffect(async () => {

		console.log(query)
		console.log(location)
		let isMounted = true;
		let _items = await client({url:"/archived-permits/records/building/search/",params:{method:"POST",body:{data:query}}})
	
		if(isMounted){
			setItems(_items)
		}
		return () => (isMounted = false)
	},[]);

	//l_data.list.columns[1].render = (p)=>{return <Link href={p}>View</Link>}
	
	if(items){
		let data = {};
		l_data.path  = {"back":{"label":"Back to search","href":"/archived-permits/search/building"}};
		l_data.list.columns[7].render = (p)=>{return <Link href={"/archived-permits/list/building/details/"+p+location.search}>View</Link>}

		l_data.list.rows = items;


		l_data.content  = 
		(
			<Page><List data={l_data.list}><div>List</div></List></Page>
		);
	
		return ( <Frame user={props.user} apps={props.apps} data={l_data} active="1" align="center"  />)
	}else{
		return <></>
	}
	



}





