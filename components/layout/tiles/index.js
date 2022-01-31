import style from './Tiles.module.css';
import Link    from 'next/link';

export default function Tile(props){

	let size    = props.size    ? "_"+props.size       : "_12"
	let padding = props.padding ? "pad_"+props.padding : "pad_lg"
	let margin  = props.margin  ? "mar_"+props.margin  : "mar_sm"
	let height  = props.height  ? "_h_"+props.height   : "_h_auto"

	const body = ()=>{
		let types = {lg:lg,md:md,sm:sm}
		return props.type ? types[props.type]() : props.children;
	}

	const lg = (p)=>{
		 return (
			<div className={"container left"}>
				<div className={"box _9 middle pad_x_md" }>
					<h4>{props.data.title}</h4>
					<p className={"pad_y_xs pad_bottom_lg "}> {props.data.details}</p>
					<Link href={props.data.link}><div className={"btn"}>{props.data.button?props.data.button:"Manage"}</div></Link>
				</div>
					<div className={"box _3 middle center"}>
					<img src={props.data.image} className={"box"} style={{"width":"144px","height":"144px"}}/>
				</div>
			</div>
		); 
	}
	const md = (p)=>{
		return (
			<div className={"container left"}>
				<div className={"left"}>
					<img src={props.data.image} className={"box"} style={{"width":"72px","height":"72px"}}/>
				</div>
				<div className={" pad_bottom_sm" }>
					<h5 className="pad_y_sm">{props.data.title}</h5>
					<p className={" pad_y_sm _h_sm"}>{props.data.details}</p>
					<Link href={props.data.link}><div className={"btn mar_top_md"}>Manage</div></Link>
				</div>
			</div>
		); 
	}
	const sm = (p)=>{
		/* return (

		); */
	}
	return ( 	
		<div className={style.tile+` ${size}`}>
			<div className={`${padding} ${margin} ${height} `}>
				{body()}
			</div>
		</div>
	)
}

