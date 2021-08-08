import Link    from 'next/link'
import style   from './Table.module.css';
import {Table} from 'antd';


export default function _Table(props)  {
	
	props.data.expandable = {expandedRowRender:record=>(record._expandable)}

	const change = (pagination, filters, sorter,extra)=>{
		console.log(pagination);
		console.log(extra);

	}

	const actions = ()=>{
		if(props.actions!=='false' || props.actions!==false){
			return (
				<div className={style.table_options}>
					<div><div className={style.action}>
						{
							props.data.buttons.action.href ? 
								<Link href={props.data.buttons.action.href}>{props.data.buttons.action.label}</Link>
								:
								<div onClick={props.data.buttons.action.click}>{props.data.buttons.action.label}</div>
						}
						
					</div></div>
					<div></div>
				</div>
			)
		}
	}

	return (
		<div className={style.table}>
			{actions()}
			<Table onChange={change} bordered="true" {...props.data} />	
		</div>
	)
}
