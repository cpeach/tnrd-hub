import style from './Container.module.css';

export default function Container(props){
	
	var padding = "";
	
	props.padding ? 
	   (padding += props.padding.all    ? style["pad_all_"+props.padding.all]+" " : "",
		padding += props.padding.x      ? style["pad_x_"+props.padding.x]+" " : "",
		padding += props.padding.y      ? style["pad_y_"+props.padding.y]+" " : "",
		padding += props.padding.top    ? style["pad_top_"+props.padding.top]+" " : "",
		padding += props.padding.bottom ? style["pad_bottom_"+props.padding.bottom]+" " : "",
		padding += props.padding.left   ? style["pad_left_"+props.padding.left]+" " : "",
		padding += props.padding.right  ? style["pad_right_"+props.padding.right]+" " : "") : ""


	var margin = "";
	
	props.margin ? 
	   (margin += props.margin.all    ? style["mar_all_"+props.margin.all]+" " : "",
		margin += props.margin.x      ? style["mar_x_"+props.margin.x]+" " : "",
		margin += props.margin.y      ? style["mar_y_"+props.margin.y]+" " : "",
		margin += props.margin.top    ? style["mar_top_"+props.margin.top]+" " : "",
		margin += props.margin.bottom ? style["mar_bottom_"+props.margin.bottom]+" " : "",
		margin += props.margin.left   ? style["mar_left_"+props.margin.left]+" " : "",
		margin += props.margin.right  ? style["mar_right_"+props.margin.right]+" " : "") : ""
	
		
	
	var size="";
	switch(props.sizeType){
		case 'fixed':
			size = props.size ? style["_fixed_"+props.size]:""; 
			break;
		case 'flex':
			size = props.size ? style["_flex_"+props.size]:""; 
			break;
		default:
			size = props.size ? style["_"+props.size]:""; 
			break;
	}

	var color  = props.color?style[props.color]:style.transparent;
	var align  = props.align?style[props.align]:style.inherit;
	var valign = props.valign?style[props.valign]:style.top;
	var border = props.border?style.border:"";
	var touch  = props.touch?style.touch:"";
	var shadow  = props.shadow?"shadow":"";
	var visable = props.visable===false?"hide":"";
	
	return (
		<div id={props.id?props.id:''}  name={props.name} style={props.style} className={`${style.container} ${margin} ${padding} ${visable} ${color} ${size} ${align} ${valign} ${border} ${touch} ${shadow}`}>
			{props.children}
		</div>
	)
}

