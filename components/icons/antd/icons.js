
/*

	For more icons reference:
	https://ant.design/components/icon/

*/


import { 
	ApartmentOutlined,
	BuildOutlined,
	AppstoreAddOutlined,
	TeamOutlined,
	UnlockOutlined,
	DeleteFilled
	
} from '@ant-design/icons';

export default function _Icon({name}){
	
	switch(name){
		case "ApartmentOutlined":return <ApartmentOutlined />;
		case "BuildOutlined":return <BuildOutlined />;
		case "AppstoreAddOutlined":return <AppstoreAddOutlined />;
		case "TeamOutlined":return <TeamOutlined />;
		case "UnlockOutlined":return <UnlockOutlined />;
		case "DeleteFilled":return <DeleteFilled />;
	}
	
}