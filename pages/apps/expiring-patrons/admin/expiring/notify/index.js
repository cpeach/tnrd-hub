import client 	from '/scripts/client-api.js';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js';
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
export default function Update(props){

  	const router = useRouter();

	const [summary, setSummary] = useState();
	const [data, setData] = useState({});
	const [label,setLabel] = useState("Send Notices");

	useEffect(async () => {
		let isMounted = true;
		let summary = await client({url:'/expiring-patrons/expiring/summary'});
		
		if(isMounted){
			setSummary(summary)
		}

		return () => (isMounted = false)
	},[]);	

	const send = async()=>{
		setLabel(<><LoadingOutlined style={{display:true,marginRight:"9px",fontSize: 16 }} spin /> <span>Sending</span></>)
		let res = await client({url:'/expiring-patrons/expiring/notify'});
		message.success({content: 'A total of '+ res.patrons.length + ' email notices were sent.'});
		console.log(res)
		router.push('/expiring-patrons/admin/notified/patrons/'+res._id);
		
	}

	const totals = ()=>{
		let out = [];
		
		for(let g in summary.groups){
			out.push(
				<div key={"item-"+g} className="mar_y_md border touch pad_y_sm pad_x_md ">
					<div className="box middle">
						<h6>{summary.groups[g].name}</h6>
						<p>{"Valid Emails "+summary.groups[g].valid+"  ·  "+"Invalid Emails "+summary.groups[g].invalid}</p>
					</div>
				</div>
			)
		}
		return out
	}

	if(summary){

		//console.log(summary)

		data.content = (
			<Page size="">
				<h1 className="pad_bottom_md">Notification Summary</h1>
				<div className="mar_y_lg border touch pad_md light">
					<div className="box pad_right_sm left middle _1" style={{minWidth:"60px"}} >
						<img src="/icons/calendar.png" style={{width:"48px"}} />
					</div>
					
					<div className="box _9 middle">
						<h6>Date Range</h6>
						<p>{summary.date_from+"  --  "+summary.date_to}</p>
					</div>
				</div>
				
				{totals()}

				<hr className="mar_y_md" />

				<div className="pad_top_md">
					<div className="_6 box pad_x_md">
						<h6 >Total: {summary.items.length}</h6>
					</div>
					<div className="_6 box right">
						<div className="btn" onClick={send}>{label}</div>
					</div>
				</div>

				

			</Page>
		)

	
		return (<Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
	}else{
		return <></>
	}
	
}



