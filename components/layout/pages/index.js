import style from './Page.module.css';

export default function Page(props){

	var type = props.type==='narrow'?style.narrow:style.page;
	var y    = props.y?'mar_y_'+props.y:'mar_y_xl';
	
	return (
        <div className={`${type}  ${y} left`} >{props.children}</div>
	)
}