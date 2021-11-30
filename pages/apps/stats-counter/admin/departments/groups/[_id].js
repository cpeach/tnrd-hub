
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

export default function Groups(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query
	
	const [groups, setGroups] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _groups = await client({url:'/stats-counter/groups/list',params:{method:'POST',body:{filters:{department:_id}}}});
		
		if(isMounted){setGroups(_groups)}
		return () => (isMounted = false)
	},[]);
	
	
		
	if(groups){
		l_data.list.columns[1].render = (p)=>{let count=p.locations.length;return <Link href={"/stats-counter/admin/departments/locations/"+p._id}>{"View ("+count+")"}</Link>}
		l_data.list.columns[2].render = (p)=>{return <Link href={"/stats-counter/admin/departments/groups/edit/"+p}>Edit</Link>}
		
		l_data.list.rows   = groups;
		
		l_data.list.new.href += _id;

		let data = {};
		data.path = {"back":{"label":"Back to Departments","href":"/stats-counter/admin/departments/"}}
		
		data.content  = 
					(
						<Page><List data={l_data.list} ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





