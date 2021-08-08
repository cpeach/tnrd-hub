
import  { useContext } from 'react'
import Signin          from '/components/frames/signin.js';
import UserContext     from '/components/context/small.js'; 


export default function _Index() { 
	const { setUser } = useContext(UserContext);
	return <Signin setUser={setUser} />
} 



