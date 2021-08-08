import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
export default function _Path({data}){
	
	return (
		<Breadcrumb>{
			data.map((item,i)=>{
				return 	<Breadcrumb.Item key={"path_"+i}>
							{
								
								item.href ?
									<Link href={item.href}>
										{item.label==='Home'?<HomeOutlined />:item.label}
									</Link>:""
							}
						</Breadcrumb.Item>
			})}
		</Breadcrumb>
	)
	
}


