
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
	

	l_data.list.columns[1].render = (p)=>{return <Link href={p}>{"Manage"}</Link>}
	
	l_data.list.rows = [
		{name:"Formats",link:"/hashad/admin/preferences/formats"},
		{name:"Subjects",link:"/hashad/admin/preferences/subjects"},
		{name:"Authors",link:"/hashad/admin/preferences/authors"}
	];
	
	let data = {};
	data.content  = 
				(
					<Page><List data={l_data.list} ><div>List</div></List></Page>
				);
	
	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)



}





