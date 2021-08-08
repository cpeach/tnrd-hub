import Link    from 'next/link';
import {withRouter} from 'next/router'
import style from './Cards.module.css';
import Container from '/components/layout/containers/index.js'
import Image from 'next/image'

function _Card(props){
	return ( 	
		<Container id={props.id?props.id:''} name={props.name?props.name:''} key={props.name} size="4" padding={{all:"sm"}} visable={props.visable} >
			<div className={style.card} onClick={()=>{props.link.indexOf('http')>-1?window.open(props.link):props.router.push(props.link) }}>
				<Container  key={props.name} size="12" padding={{all:"lg"}} align="left" >
					<img src={props.image===''?"/icons/app.png":props.image} width={42} height={42} />
					<h3   className={style.card_title}>{props.title}</h3>
					<div  className={style.card_dash}></div>
					<p    className={style.card_details}>{props.details.substr(0,94)+" ..."}</p>
				</Container>
			</div>
		</Container>
	)
}

export function forward(){
	console.log(props)
	console.log("forward");
}


export default withRouter(_Card)

/*<Container touch={props.touch} shadow={props.shadow} >
				
			</Container>*/