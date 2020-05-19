const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const UserMysql = require('../models/UserMysql');
const app = express();

app.use(express.json)
app.use(bodyParser.json())


router.get('/', forwardAuthenticated, (req, res) => res.redirect('home'));

router.get('/trips',(req,res) =>{
  res.render('trips',{
    user: req.user
  });
})

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.post('/customer/insert',(req, res) =>{
  // const {CMND,TenKH,Email,SDT,GioiTinh,DiaChi} = req.body;
  if(req.body){
    const {CMND,TenKH,Email,SDT,GioiTinh,DiaChi} = req.body; 
    let bind = [];
    bind.push(CMND) 
    bind.push(TenKH) 
    bind.push(Email) 
    bind.push(SDT) 
    bind.push(GioiTinh) 
    bind.push(DiaChi) 
    UserMysql.save(bind,(result) =>{
      if(result) return res.status(201).send({status:true})
      return  res.status(204).send({status:false})
    })
    

  }else{
   return res.send({status:false})
  }
});

router.get('/admin/trips',ensureAuthenticated,(req,res) =>{
  UserMysql.getAllTrips((trips)=>{
    res.json(trips)
  })
})

router.get('/post/:trip/:date', (req, res) =>{
  UserMysql.findPost(req.params.trip,req.params.date,(post)=>{
   res.json(post)

  })
});

router.get('/time/:trip/:date', (req, res) =>{
  UserMysql.getTimePost(req.params.trip,req.params.date,(post)=>{
   res.json(post)
  })
});

router.get('/post/:trip/:date/:time', (req, res) =>{
  UserMysql.findPostTime(
    req.params.trip,
    req.params.date,
    req.params.time,(post)=>{
   res.json(post)

  })
});

router.get('/trip',(req,res) =>{
  UserMysql.findTrip((post)=>{
   res.status(200).json(post)

  })
})


router.get('/booking-ticket', (req, res) => {
  const id = req.query.deleteId;
  if(id) {
    UserMysql.deletePost(id,(result)=>{
     if(result)  return console.log("done")
    })
    return res.redirect('/booking-ticket')
  }
 
  res.render('booking',{
    title:"nguyen"
  })
});

router.get('/posts', (req, res) => {
  let id = req.params.id;
  // UserMysql.findById(id,function(result){
  //   if(result) res.json(result);
  // })
  UserMysql.getPosts((result) =>{
    res.json(result)
  })
});

router.get('/checkseat',(err, res) =>{
  UserMysql.findSeat("A11","P002",(result) =>{
      if(result.length > 0) res.status(200).send({isExisted:true})
      else res.status(204).send({isExisted:false})
  })
})


router.get('/account/profile/',ensureAuthenticated, (req, res) =>{
	 // User.findById(req.params.id, function(err, user) {
  //    	res.render('changename',{
  //    		username:user
  //    	});
  //   });
	res.render('changename',{
    user:req.user
  });
}
	 
);
router.get('/users', async (req, res) =>{
    // try{
    //   const users = await User.find();
    //   res.json(users)
    // }catch(err){
    //   res.json({message:err})
    // }
    User.find().then((users)=>{
       res.json(users)
    }).catch((err)=>{
      res.json(err)
    })
  }
);

router.get('/home',(req,res) => {
   if(req.query.d){
    console.log(req.query.d);
  }
  res.render('home',{
    user:req.user
  })
})

router.get('/mua-ve-saigon-kiengiang',(req,res) => {
  var userInfo = {
    CMND:'',
    TenKH:'',
    Email:'',
    STD:'',
    GioiTinh:'',
    DiaChi:''
  };
  if(req.user)
  UserMysql.getInfoUser(req.user.email,(user)=>{
    if(user.length > 0){
      userInfo.CMND = user[0].CMND;
      userInfo.TenKH = user[0].TenKH;
      userInfo.Email = user[0].Email;
      userInfo.SDT = user[0].SDT;
      userInfo.GioiTinh = user[0].GioiTinh;
      userInfo.DiaChi = user[0].DiaChi;
      res.render('saigon-kiengiang',{
        user:req.user,
        userInfo:userInfo 
      })
    }else
      res.render('saigon-kiengiang',{
        user:req.user
      })

  })
else  res.render('saigon-kiengiang',{
        user:req.user
      })
  
})

router.get('/mua-ve-dalat-saigon',(req,res) => {
  res.render('dalat-saigon')
})


module.exports = router;
