import style     from './Stacks.module.css';
import Path      from '/components/navigation/path.js';
import Container from '/components/layout/containers/index.js';



export default function _Content(props){
	
	
	return(
	
		<Container className={style.content} size={props.width?props.width:"10"} padding={{y:"sm"}} align="left">
			
			<div className={style.content_heading}>
				<h1>{props.data.title}</h1>
			</div>
			{props.data.content}
		</Container>
	
	)
	
}
/* {props.data.path?(<Path data={props.data.path} />):(<></>)} */