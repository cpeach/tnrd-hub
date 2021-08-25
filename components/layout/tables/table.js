import Link    from 'next/link'
import style   from './Table.module.css';
import {Table,Tooltip} from 'antd';
import { MenuOutlined,FunnelPlotOutlined,PrinterOutlined,DownloadOutlined,PlusOutlined  } from '@ant-design/icons';


export default function _Table(props)  {
	
	//props.data.expandable = {expandedRowRender:record=>(record._expandable)}

	const change = (pagination, filters, sorter,extra)=>{
		console.log(pagination);
		console.log(extra);

	}

	const actions = ()=>{
		if(props.actions!=='false' || props.actions!==false || props.options!==false){
			return (
				<div className={style.table_options}>
					<div>
						<div className={style.action_filter}><span>Filters</span><FunnelPlotOutlined /></div>
						<div className={style.action}>
						{
							props.data.buttons.action.href ? 
								<Link href={props.data.buttons.action.href}>{props.data.buttons.action.label}</Link>
								:
								<div onClick={props.data.buttons.action.click}>{props.data.buttons.action.label}</div>
						}
						</div>
					</div>
					<div>
						<Tooltip title="Export" color="rgba(0,0,0,0.7)" ><div className={style.action_icon}><DownloadOutlined /></div></Tooltip>
						<Tooltip title="Print" color="rgba(0,0,0,0.7)" ><div className={style.action_icon}><PrinterOutlined /></div></Tooltip>
						
						
						{props.data.buttons.action.href ? 
							<Link href={props.data.buttons.action.href}><Tooltip title={props.data.buttons.action.label} color="rgba(0,0,0,0.7)" ><div className={style.action_add}><PlusOutlined /></div></Tooltip></Link>
							:
							<Tooltip title={props.data.buttons.action.label} color="rgba(0,0,0,0.7)" ><div onClick={props.data.buttons.action.click}><div className={style.action_add}><PlusOutlined /></div></div></Tooltip>
						}	
						
						
						
					</div>
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
