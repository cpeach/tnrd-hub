
import style from '../Form.module.css';

export default function Submit(props) {

	return (<input className={style.submit} type="submit" defaultValue={props.label} />)
	
}