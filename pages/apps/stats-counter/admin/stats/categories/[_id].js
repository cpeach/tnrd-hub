
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Empty } from 'antd';

import ld   from './data.json';

export default function Categories(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query
	
	const [items, setItems] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _items = await client({url:'/stats-counter/categories/list',params:{method:'POST',body:{filters:{topic:_id}}}});
		if(isMounted){setItems(_items)}
		return () => (isMounted = false)
	},[]);
	
	var item = api({url:"/stats-counter/topics/"+_id})

	if(items && item){
		l_data.list.columns[1].render = (p)=>{let count=p.items.length;return <Link href={"/stats-counter/admin/stats/items/"+p._id}>{"View ("+count+")"}</Link>}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/stats-counter/admin/stats/categories/edit/"+p}>Edit</Link>}
		
		l_data.list.rows = items;
		l_data.list.new.href += _id;
		
		let data = {};
		data.path = {"back":{"label":"Back to Topics","href":"/stats-counter/admin/stats/"}}
		data.content  = 
					(
						<Page><List data={l_data.list} ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





