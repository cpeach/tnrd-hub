import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';
import Link    from 'next/link';
export default function Index(props) { 
    
    let data = {}
	data.content  = (

        <Page>
            <h1 className="mar_md pad_bottom_sm">Welcome to Hub Console</h1>
            <p className="mar_md pad_bottom_xl _11">Below you will find all the resources you need to manage the applications, departments, users, and roles that are used to build out content in TNRD's Application Hub  </p>
            <Tile size="12" margin="md">
                <div className={"container left"}>
                    <div className={"box _9 middle pad_x_md" }>
                        <h4>Applications</h4>
                        <p className={"pad_y_xs pad_bottom_lg "}>The primary purpose of Application Hub is to provide single point of access for all internal and external applications. Use this section to manage all applications.  </p>
                        <Link href="/hub-console/admin/applications"><div className={"btn"}>Manage</div></Link>
                    </div>
                        <div className={"box _3 middle center"}>
                        <img src="/illustrations/applications3.png" className={"box"} style={{"width":"144px","height":"144px"}}/>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/dept.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Departments</h5>
                        <p className={" pad_y_sm pad_bottom_lg _h_sm"}>Application can belong to one or more departments. Manage all department filters here</p>
                        <Link href="/hub-console/admin/departments"><div className={"btn"}>Manage</div></Link>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/role.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Users</h5>
                        <p className={" pad_y_sm pad_bottom_lg  _h_sm"}>Application Hub is limited to TNRD staff through Active Directory. Manage all system users here.</p>
                        <Link href="/hub-console/admin/users"><div className={"btn"}>Manage</div></Link>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/user.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Roles</h5>
                        <p className={" pad_y_sm pad_bottom_lg  _h_sm"}>Internal Hub applications may limit access based on role type. Manage all user roles here.</p>
                        <Link href="/hub-console/admin/roles"><div className={"btn"}>Manage</div></Link>
                    </div>
                </div>
            </Tile>
            
           
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





