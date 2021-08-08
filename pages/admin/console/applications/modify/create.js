import React    from 'react';
import {withRouter} from 'next/router'
import api 		from '/api/console.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/content.js';
import {notification} from 'antd';
import g_data   from '../../data.json';
import l_data   from './data.json';

class Update extends React.Component {
	constructor(props) {
		super(props); 
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	async handleSubmit(data) {
		var notice = {};
		var results = await api.applications.insert(data);
		if(results._id){
			notice.duration    = l_data.notices.complete.duration;
			notice.message     = l_data.notices.complete.message.replace('_$name',results.name);
			notice.description = l_data.notices.complete.description;
			notification['success'](notice);
		}else{
			notice.duration    = l_data.notices.complete.duration;
			notice.message     = l_data.notices.failed.message;
			notice.description = results.message; 
			notification['error'](notice);
			
		}
		this.props.router.push('/hub-console/applications/list/') 
	}
	
			

	render() {
		
		l_data.form.fields[0].options = this.props.departments.map(item=>({label:item.name,name:item.short,value:item._id}));
		l_data.content = (<Form ref="form" key="form" size="10" form={l_data.form} onSubmit={this.handleSubmit} ></Form>)
		g_data.content = (<Content data={l_data} />);	
			
		return (<Frame data={g_data} active="1" />)
	}
}


export async function getServerSideProps(context){
	let departments = await api.departments.get.all();
	return {props:{departments}}
}


export default withRouter(Update)
