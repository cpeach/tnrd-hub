
/*
	Utilities: This class is just a collection of helper functions that can be added to components as needed. 

*/

export default {
	
	obj : {
		parse(ref,path){
			var valid  = false;
			var tokens = path.split('.');
			valid = ref[tokens[0]]?true:false;
			tokens.map(i=>{ref=ref[i]||ref});
			return valid?ref:'';
		}	  
	},
	


	
}



