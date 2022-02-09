
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import moment  from 'moment';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Patrons(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const router = useRouter();
	const {_id} =  router.query
	
	const [history, setHistory] = useState();
	const [patron, setPatron] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _history = await client({url:'/hashad/checkouts/'+_id});
		let _patron = await client({url:'/hashad/patrons/'+_id});
		
		if(isMounted){
			setHistory(_history.entries);
			setPatron(_patron)
		}
		return () => (isMounted = false)
	},[]);

	const onChange = async (p)=>{
		//return await client({url:'/hashad/patrons/list',params:{method:"POST","body":JSON.stringify(p)}});
	}
	
	if(patron&&history){

		l_data.list.title = " Checkouts - "+patron.name;
		l_data.list.columns[0].render = (p)=>{var date = p.split('T');return moment(date,"YYYY-MM-DD").format("LL")}
		l_data.list.columns[4].render = (p)=>{return p.value} 
		l_data.list.rows = history;
		
		let data = {};
		data.path = {"back":{"label":"Back to Patrons","href":"/hashad/admin/patrons/"}},
		data.content  = 
					(
						<Page><List data={l_data.list}  ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





