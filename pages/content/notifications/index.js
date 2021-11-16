import {useState} from 'react';
import client 	from '/scripts/client-api.js';
import Frame     from '/components/frames/frame2.js';
import Page     from '/components/layout/pages/index.js';

import style  from './Notifications.module.css';


export default function Profile(props){



	var data = {}

	if(props.user){
		
		data.content = 	(
			<Page type='narrow'>
				<h1>Notifications</h1>
			</Page>
			
		)
	}
	return(
		<Frame user={props.user} apps={props.apps} key="frame" data={data} align="center"  active="1" navigation="false" />
	)	
	
	
	

}