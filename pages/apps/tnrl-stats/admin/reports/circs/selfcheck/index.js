
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import moment  from 'moment';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Reports(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	const [reports, setReports] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _reports = await client({url:'/tnrl-stats/reports/wifi/usage'});
		console.log(reports)
		if(isMounted){
			setReports(_reports)
		}
		return () => (isMounted = false)
	},[]);
	
	if(reports){

		l_data.list.columns[2].render = (p)=>{var date = p.split('T');return moment(date,"YYYY-MM-DD").format("LL")}
		l_data.list.columns[3].render = (p)=>{return <Link href={p}>{"Download"}</Link>}
		l_data.list.columns[4].render = (p)=>{return <Link href={"/tnrl-stats/admin/reports/wifi/usage/"+p}>Edit</Link>}
		
		l_data.list.rows = reports;
		
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





