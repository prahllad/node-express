const crypto = require('crypto');
const Session = require('../models/Session');
let timer;
let grid={1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',10:''}
let control = {
	using:false,
	user:'',
};
let color ={}
let SetColor ={yellow:0,red:0}


exports.checkUseBoard = (req, res, next) => {
	let { userId } = req.query;
  let obj;
  if (!control.using) {
    obj = control;
  }
  else if (control.user === userId) obj = control;
  else if (control.user !== userId)
    obj = {
      using: false,
      user: userId,
    };
  
  res.json({...obj,currentUser:control.user,grid:grid});

};

exports.takeControl = (req,res,next) =>{
	let tmp ;
	control.using = true;
	control.user = req.body['userID']

	
	if(!color[req.body['userID']])
	{
		if(!SetColor.yellow){
			tmp ='yellow'
			SetColor.yellow = 1
		}else if(!SetColor.red){
			tmp ='red'
			SetColor.red = 1
		}
		color[req.body['userID']] = tmp

		
	}
	timer = setTimeout(()=>{
		control.user = ''
		control.using = false;
	},1000*120)
	
}
exports.removeControl = (req,res,next) =>{
	let style;
	if(control.user=== req.body['userID']){
		control.user = '';
		control.using = false;
	}
	clearTimeout(timer);
	res.send(color[req.body['userID']])

}

exports.setGridColor = (req,res,next) =>{
	let {gridId,color} = req.body;
	 grid[gridId] = color;
}

