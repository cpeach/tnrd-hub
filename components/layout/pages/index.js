import style from './Page.module.css';

export default function Page(props){
	
	//var visable = props.visable===false?"hide":"";
	
	return (

        <div className={style.page+" mar_y_xl left"}>{props.children}</div>

	)
}