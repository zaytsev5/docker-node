const mysql = require('mysql');
//MySql config
const mysqlDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'booking_system'
})
mysqlDB.connect(function(err){
  if(err) return console.log(err)
  console.log("Mysql connected...")
})


module.exports = {
 findPost: function(trip,date,callback){
 	let query = "select * from chuyenxe where MaTX = ? and NgayDi=?";
 	let bind = [];
 	bind.push(trip);bind.push(date)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 findTrip:function(callback){
 	let query = "select * from tuyenxe"
 	mysqlDB.query(query,(err,result)=>{
 		if(err) throw err
 		callback(result)
 	})
 },
 findByEmail : function(email,callback){
 	let query = "select * from users where email = ?";
 	mysqlDB.query(query,email,)
 },
 addOne: function(val1,val2,val3,callback){
 	let bind = [];
 	bind.push(val1);bind.push(val2);bind.push(val3)
 	let query = "INSERT INTO `xe`(`BienSoXe`, `LoaiXe`, `SoChoNgoi`, `MaBX`) VALUES (?,?,30,?)"
 	mysqlDB.query(query,bind,(err,result) =>{
 		if(err) return  callback({isAdded:false})
 		callback({isAdded:true})
 	})
 },
 findPostTime: function(trip,date,time,callback){
 	let query = 'select * from chitietvexe where MACX = (select MaCX  from chuyenxe where MaTX =? and NgayDi=? and gioDi=? and SoVeHienCon > 0)';
 	let bind = [];
 	bind.push(trip);bind.push(date);bind.push(time)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 getTimePost:function(trip,date,callback){
 	let query = 'select gioDi from chuyenxe where MaTX =? and NgayDi = ?';
 	let bind = [];
 	bind.push(trip);bind.push(date)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 getAllTrips:function(callback){
 	let query = 'select * from tuyenxe';
 	mysqlDB.query(query,(err, result) =>{
 		if(err) throw err
 		callback(result)
 	})
 },
 getInfoUser:function(email,callback){
 	let query = 'select * from khachhang where Email = ?'
 	mysqlDB.query(query,email,(err, result) =>{
 		if(err) throw err
 		callback(result)
 	})
 },
 save:function(bind,callback){
 	let query = 'INSERT INTO `khachhang`(`CMND`, `TenKH`, `Email`, `SDT`, `GioiTinh`, `DiaChi`) VALUES (?,?,?,?,?,?)'
 	mysqlDB.query(query,bind,(err,result) =>{
 		if(err) return console.log(err)
 		callback(result)
 	})
 },
 findSeat:function(seat,postID,callback){
 	let query = 'select * from chitietvexe where MaCX=? and SoGhe=?'
 	let bind = [];
 	bind.push(postID);bind.push(seat)
 	mysqlDB.query(query,bind,(err,result)=>{
 		if(err) return console.log("a mistake")
 		callback(result)
 	})
 }

};