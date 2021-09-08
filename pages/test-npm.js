
import style     from '/styles/Index.module.css';
import Frame   from '/components/frames/frame.js';

import { Button } from "tnrd-npm-test"


export default function TestNPM(props) { 
	
	var data = {}

 	data.content = (
		
			<div style={{"display":"inline-block","margin-top":"120px"}}>
				<Button label="test" kind="primary"/>
        
			</div>
	)

	
							
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={data}  active="1" navigation="false" path={false} />)
} 


