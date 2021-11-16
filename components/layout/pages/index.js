import style from './Page.module.css';

export default function Page(props){
	
	var type = props.type==='narrow'?style.narrow:style.page;
	
	return (
        <div className={`${type} mar_y_xl left`} >{props.children}</div>
	)
}