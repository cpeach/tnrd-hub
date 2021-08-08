import Link    from 'next/link';
import style from './Stacks.module.css';
import Container from '/components/layout/containers/index.js';

export default function _Landing(props){
	
	const menu = (menu,type)=>{
		var items = menu.map((item)=>{
			if(item.type===type){
				return <Link href={item.link}>{item.label}</Link>
			}
		});
		return items; 
	}


	return (
		<>
		<Container size="12" color="primary" align="left" padding={{y:"md",x:"xxl"}}>
			<div className={style.landing_content} >
				<h1 className={style.landing_title}>{props.data.name}</h1>
				<div  className={style.landing_dash}></div>
				<p className={style.landing_description}>{props.data.description}</p>
				<div className={style.landing_actions}>
					{menu(props.data.ui.menu,"primary")}
				</div>
			</div>
		</Container>
		<Container size="12" padding={{x:"xl"}} style={{borderBottom:"1px solid rgb(200,200,200)"}}>
			<div className={style.landing_menu}>
				<div>{menu(props.data.ui.menu,"secondary")}</div>
			</div>
		</Container>
		</>
	)
}

/*  <Link href={props.data.actions.primary.href}>
			<button className={style.landing_button_primary}>{props.data.actions.primary.label}</button>
		</Link> */