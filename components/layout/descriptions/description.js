import style          from './Descriptions.module.css';
import {Descriptions} from 'antd';


export default function _Descriptions(props)  {
	
	return (
		<Descriptions title={props.data.title} bordered>
		{
			props.data.details.map(item=>(<Descriptions.Item {...item.attributes}>{props.record[item.ref]}</Descriptions.Item>))
		}
		</Descriptions>
	)
}

 