import Link    from 'next/link';
import {withRouter} from 'next/router'
import style from './Dialogs.module.css';
import Container from '/components/layout/containers/index.js'
import { Modal, Button } from 'antd';
function _Dialog(props){
	
	return ( 	
      <Modal title="Unauthorized" visible="true">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
	)
}

export default withRouter(_Dialog)
