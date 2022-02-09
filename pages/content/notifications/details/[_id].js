

import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import moment  from 'moment';
import { Empty,Badge } from 'antd';
import {CalendarOutlined } from '@ant-design/icons';


export default function TNRD(props) { 

	let data = {}

	const router = useRouter();
	const {_id}  =  router.query;

	const [item, setItem] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _item = await client({url:'/hub-console/notice_items/'+_id});
		
		if(isMounted){
			setItem(_item);
			document.getElementById("content").innerHTML = _item.content;
		}
		return () => (isMounted = false)
	},[]);

	

	if(item){

		data.path  = {"back":{"label":"Back to Notifictions","href":"/notifications/"+props.user.profile._id}},
		
		data.content  = 
			(
				<>
				<Page type="narrow" y="lg">
					<div className="mar_y_sm">
					<h1>{item.title}</h1>
					<div className="mar_top_md">
						<div className="box">
							<CalendarOutlined style={{fontSize:"19px"}} />
						</div>
						<div className="box pad_left_md">
							{moment(item.date,"YYYY-MM-DD").format("LL")}
						</div>
					</div>
					</div>
				</Page>
				<div className="light b-t" style={{"minHeight":"500px"}}>
					<Page type="narrow" y="lg">
						<div className="mar_y_md"><p>{item.notice.message}</p></div>
						<div id="content" className="white border mar_top_lg pad_lg shadow"></div>
					</Page>
				</div>
				</>
			);
	
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





