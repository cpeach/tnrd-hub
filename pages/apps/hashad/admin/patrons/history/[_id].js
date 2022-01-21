
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

export default function Patrons(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const router = useRouter();
	const {_id} =  router.query
	
	const [history, setHistory] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _history = await client({url:'/hashad/checkouts/'+_id});
		
		if(isMounted){
			setHistory(_history.entries)
		}
		return () => (isMounted = false)
	},[]);

	const onChange = async (p)=>{
		//return await client({url:'/hashad/patrons/list',params:{method:"POST","body":JSON.stringify(p)}});
	}
	
	if(history){

		/* l_data.list.columns[1].render = (p)=>{return p+""}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/hashad/admin/patrons/"+p}>View</Link>}
		l_data.list.columns[4].render = (p)=>{return <Link href={"/hashad/admin/patrons/edit/"+p}>Edit</Link>}
		 */
		l_data.list.rows = history;
		
		let data = {};
		data.content  = 
					(
						<Page><List data={l_data.list}  ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





