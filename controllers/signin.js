const handleSignIn=(req,res,db,bcrypt)=>{
	const {email,password}=req.body;
	if(!email || !password){
		return res.status(400).json("error credentials")
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data=>{
		const isValid=bcrypt.compareSync(password, data[0].hash); 
		if(isValid){
			return db.select('*').from('users')
			.where('email','=',email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json("error signing in"))
		}else{
			res.status(400).json("error login user");
		}
	})
	.catch(err=>res.status(400).json("error signing in"))
}

module.exports={
	handleSignIn:handleSignIn
}