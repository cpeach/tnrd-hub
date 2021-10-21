
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Applications(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [applications, setApplications] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _applications = await client({url:'/api-console/applications'});
		isMounted?setApplications(_applications):null;
		return () => (isMounted = false)
	},[]);
	
	if(applications){

		l_data.list.columns[0].render = (p)=>{return <img src={p.url} />}
		l_data.list.columns[3].render = (p)=>{let vals = p.map(item=>(item.name));return vals.join()}
		l_data.list.columns[4].render = (p)=>{return <a href="">Edit</a>}

		l_data.list.rows   = applications;
		
		let data = {};
		data.content  = 
					(
						<Page><List data={l_data.list}><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





