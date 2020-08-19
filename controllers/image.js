const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: '602911e39063406b9dfda55b1f7bffab'
});

const handleApiCall=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	  .then(data=>{
	  res.json(data);
})
	  .catch(err=>res.status(400).json("error fetching API"))
}
 
  

const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where({id:id})
	.returning('entries')
	.increment('entries',1)
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>res.status(400).res('error updating entries'))
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}

