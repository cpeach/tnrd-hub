import style from './Tiles.module.css';

export default function Tile(props){

	let size    = props.size    ? "_"+props.size       : "_12"
	let padding = props.padding ? "pad_"+props.padding : "pad_lg"
	let margin  = props.margin  ? "mar_"+props.margin  : "mar_sm"
	let height  = props.height  ? "_h_"+props.height   : "_h_auto"


	return ( 	
		<div className={style.tile+` ${size}`}>
			<div className={`${padding} ${margin} ${height} `}>
				{props.children}
			</div>
		</div>
	)
}

