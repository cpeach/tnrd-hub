import Link    from 'next/link';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import api 	   from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Table       from '/components/layout/tables/table.js';
import Content 	   from '/components/layout/stacks/index.js';
import Insights    from '/components/layout/insights/index.js';
import Description from '/components/layout/descriptions/description.js';
import { Empty,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


export default function Notifications(props) { 
	
	var l_data = JSON.parse(JSON.stringify(ld))
	var g_data = JSON.parse(JSON.stringify(gd))
	
	var records = api({url:'/libraries/expiring/patrons',params:{method:"POST",body:[0,1,2,30,31,32,11,12,30]}});
	l_data.content 	= getContent(records,l_data);
	g_data.content  = (<Content width="8" data={l_data} />);

	return ( <Frame user={props.user} apps={props.apps} navigation="false" background="white" data={g_data} />)
} 
									
export function getContent(records,data){
	if(records && records.entries.length>0){
		var valid_count = 0;
		var invalid_count = 0;
		var type_count = {general:0,temporary:0,staff:0};
		var items = [];
		data.table.columns[1]["onFilter"] = (value, record) => {return record.type.includes(value);}
		data.table.columns[2]["onFilter"] = (value, record) => {return record.valid.includes(value);}
		data.table.columns[3].render = (record)=><Link href={"/admin/console/applications/modify/"+record._id}>Edit</Link>;
		
		records.entries.forEach((item)=>{
			var _item = {}
			_item.key   = item.id;
			_item.email = item.emails ? item.emails.toString() : 'No Email';
			_item.type  = type(item.patronType);
			_item.type==='General'?type_count.general++:_item.type==='Temporary'?type_count.temporary++:type_count.staff++
			
			_item.valid = item.emails ? validateEmail( item.emails[0] )+'': 'false';
			_item.valid === 'false' ? invalid_count++ : valid_count++;
			
			items[items.length] = _item;
			//item._expandable = (<Description data={{...data.table.expandable}} record={{...item}} />)
		});
		data.table.buttons.action.click = send;
		data.table.dataSource = items;
		data.insights.blocks[0].value = records.entries.length;
		data.insights.blocks[1].value = valid_count;
		data.insights.blocks[2].value = invalid_count;
	
		data.insights.blocks[3].values[0].value = type_count.general;
		data.insights.blocks[3].values[1].value = type_count.temporary;
		data.insights.blocks[3].values[2].value = type_count.staff;

		return (<><Insights data={data.insights} /><Table data={data.table} /></>)
	}else{
		return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
	}	
}

export function type(t){
	var type      = '';
	var general   = [0,1,2,31,32];
	var temporary = [11,12];
	var staff     = [30];

	type = general.includes(parseInt(t))   ? 'General':type;
	type = temporary.includes(parseInt(t)) ? 'Temporary':type;
	type = staff.includes(parseInt(t))     ? 'Staff':type;
	return type
}
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function send(e){
	
	confirm({
        icon: <ExclamationCircleOutlined />,
		title: 'Would you like to notify patrons',
		content:(<div>Please note, all 123 patrons with valid email addresses will be notified.</div>),
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
}



