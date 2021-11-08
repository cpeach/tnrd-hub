import client 	from '/scripts/client-api.js';
import {useEffect,useState} from 'react';
import ld   from './data.json';
import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js';

export default function Update(props){

	let data = JSON.parse(JSON.stringify(ld))
	
	const [summary, setSummary] = useState();

	useEffect(async () => {
		let isMounted = true;
		let summary = await client({url:'/expiring-patrons/expiring/summary'});
		
		if(isMounted){
			setSummary(summary)
			//var options = _departments.map(item=>({value:item._id,name:item.short,label:item.name}))
			
		}
		return () => (isMounted = false)
	},[]);	

	if(summary){

		console.log(summary)

		data.content = (
			<Page size="">
				<h1 className="pad_bottom_md">Notify Expiring Patrons</h1>
				<div className="mar_y_lg border touch pad_md light">
					<div className="box pad_right_sm left middle _1" style={{minWidth:"60px"}} >
						<img src="/icons/calendar.png" style={{width:"48px"}} />
					</div>
					
					<div className="box _9 middle">
						<h6>Date Range</h6>
						<p>November 21, 2021  --  December 21, 2021</p>
					</div>
				</div>
				
				<div className="mar_y_sm border touch pad_y_sm pad_x_md ">
					
					<div className="box  middle">
						<h5>General </h5>
						<p>Valid Emails 26  ·  Invalid Emails 4</p>
					</div>
				</div>

				<div className="mar_y_sm border touch pad_y_sm pad_x_md">
					
					<div className="box  middle">
						<h5>Staff</h5>
						<p>Valid Emails 26  ·  Invalid Emails 4</p>
					</div>
				</div>

				<div className="mar_y_sm mar_bottom_lg border touch pad_y_sm pad_x_md ">
					
					<div className="box  middle">
						<h5>Temporary</h5>
						<p>Valid Emails 26  ·  Invalid Emails 4</p>
					</div>
				</div>

				<hr className="mar_y_md" />

				<div className="pad_top_md">
					<div className="_6 box pad_x_md">
						<h6 >Total: 36</h6>
					</div>
					<div className="_6 box right">
						<div className="btn">Send Notices</div>
					</div>
				</div>

			</Page>
		)

	
		return (<Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
	}else{
		return <></>
	}
	
}



