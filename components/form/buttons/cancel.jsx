import React from 'react';
import style from '../Form.module.css';
import Link  from 'next/link';

export default class Submit extends React.Component {
	constructor(props) {
		super(props);
	  }
	 render() {
		return (<div className={style.cancel}><Link href={this.props.href}>Cancel</Link></div>)
	 }
}
