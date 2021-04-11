//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
var mysql = require('mysql');
// 引入mysql连接配置
var mysqlconfig = require('../config/mysql');
// 引入连接池配置
var poolextend = require('./poolextend');
// 引入SQL模块
var sql = require('./sql');
// 引入json模块
var json = require('./json');
// 使用连接池，提升性能
var pool = mysql.createPool(poolextend({}, mysqlconfig));
const jwt=require('jsonwebtoken');//用来生成token
var check={
    query:function(req,res){
        let token=req.get("Authorization");//从Authorization中获取token
        let secretOrPrivateKey="junhan";//这是加密的key
        jwt.verify(token,secretOrPrivateKey,(err,decode)=>{
            if(err){
                res.send({status:10010})
            }else{
                res.send({status:10011})
            }
        })
    }
}
var userData = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param=req.body;
            connection.query(sql.user.insert, [param.userId, param.username, param.password, param.realname,param.phone,param.email,param.photo], function(err, result) {
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.userId;
            connection.query(sql.user.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        console.log(param.password)
        if (param.username == null || param.password == null || param.userId == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.user.update, [param.username, param.password,param.phone,param.email,param.photo,param.autograph, +param.userId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.user.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    query:function(req,res,next){
        var param=req.body;
        pool.getConnection(function(err,connection){
            connection.query(sql.user.query,[param.username,param.password],function(err,result){
                if(result!=''){
                    let content={name:param.username};//要生成token的主题信息
                    let secretOrPrivateKey="junhan";//这是加密的key（密钥）
                    let token=jwt.sign(content,secretOrPrivateKey,{
                        expiresIn:60*60*1
                    });
                    connection.query(sql.user.update1,[token,param.username],function(err,result){
                        
                    })
                    res.json({status:200,username:param.username,token:token,data:result})
                }else{
                    res.json({status:401,message:''})
                }
                connection.release();
            })
        })
    },
    queryId:function(req,res,next){
        var param=req.body;
        pool.getConnection(function(err,connection){
            connection.query(sql.user.queryId,[param.userId],function(err,result){
                if(result!=''){
                    var _result=result;
                    result={
                        result:'select',
                        data:_result
                    }
                }else{
                    result=undefined;
                }
                json(res,result);
                connection.release();
            })
        })
    }
};
//学生管理
var stuInforData = {
    add: function(req, res, next) { 
        pool.getConnection(function(err, connection) {
            // var param = req.query || req.params;
            var param=req.body;
            connection.query(sql.stu.insert, [param.stuId,param.stuAdmi, param.stuName, param.stuSex, param.ID, param.isWork, param.stuHealthy, param.phone,param.trainingCar, param.nativePlace, param.currentPlace, param.stuPhoto], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.stuId;
            connection.query(sql.stu.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        console.log(req.body);
        if (param.stuId == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu.update, [param.stuName,param.stuAdmi,param.stuSex,param.ID,param.isWork,param.stuHealthy,param.phone,param.trainingCar,param.nativePlace,param.currentPlace,param.stuPhoto, param.stuId], function(err, result) {
                console.log(result)
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
var stuExamData = {
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.stuId;
            connection.query(sql.stu_exam.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        console.log(param.stuId);
        if (param.stuId==null) {
            json(res, undefined);
            console.log(1)
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu_exam.update, [param.trainingCar,param.exam,param.appoint,param.appointDate,param.appointPlace,param.score1,param.score1date,param.score1Place,param.score2,param.score2date,param.score2Place,param.score3,param.score3date,param.score3Place,param.score4,param.score4date,param.score4Place,param.stuId], function(err, result) {
                console.log(result)
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu_exam.queryAll, function(err, result) { 
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
var stuTrainData = {
    update: function(req, res, next) {
        var param = req.body;
        if (param.stuId==null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu_train.update, [param.trainingMode,param.trainingCar,param.trainingTeacher,param.examPay,param.trainingID,param.trainingTime,param.trainingPlace,param.isExam,param.tuition,+param.stuId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.stu_train.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
//教练管理
var teacherInforData = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // var param = req.query || req.params;
            var param=req.body;
            console.log(req.body)
            connection.query(sql.teacher.insert, [param.teacherId, param.teacherName,param.teacherSex, param.ID, param.photo, param.IsHealthy, param.Phone, param.nativePlace, param.currentPlace, param.teachYear, param.driverYear,param.praise,param.driverCar], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.teacherId;
            connection.query(sql.teacher.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.teacherId==null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.teacher.update, [ param.teacherName,param.teacherSex,param.ID,param.IsHealthy,param.Phone,param.nativePlace,param.currentPlace,param.teachYear,param.driverYear,param.praise,param.driverCar,param.photo,param.teacherId], function(err, result) {
                console.log(param)
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.teacher.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
var teacherWagesData={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // var param = req.query || req.params;
            var param=req.body;
            connection.query(sql.teacher_wages.insert, [param.month, param.wages, param.deduction, param.bonus, param.totalWages], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    // delete: function(req, res, next) {
    //     pool.getConnection(function(err, connection) {
    //         var id = +req.query.teacherId;
    //         connection.query(sql.teacher_wages.delete, id, function(err, result) {
    //             if (result.affectedRows > 0) {
    //                 result = 'delete';
    //             } else {
    //                 result = undefined;
    //             }
    //             json(res, result);
    //             connection.release();
    //         });
    //     });
    // },
    update: function(req, res, next) {
        var param = req.body;
        if (param.month == null || param.wages==null || param.deduction==null || param.bonus==null || param.totalWages==null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.teacher_wages.update, [ param.month,param.wages,param.deduction,param.bonus,param.totalWages], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.teacher_wages.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
//汽车管理
var carInfoData={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param=req.body;
            connection.query(sql.car_info.insert, [param.plateId,param.carId,param.photo,param.unit,param.carname,param.repairCar,param.wareHouse,param.place,param.company,param.charge,param.email,param.phone], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.plateId;
            connection.query(sql.car_info.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    examine: function(req, res, next) {
        var param = req.body;
        if (param.plateId == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_info.examine, [param.plateId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.plateId == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_info.update, [ param.carId,param.photo,param.unit,param.carname,param.repairCar,param.wareHouse,param.place,param.company,param.charge,param.email,param.phone,param.plateId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_info.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    query:function(req,res,next){
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_info.query, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryNum:function(req,res,next){
        pool.getConnection(function(err,connection){
            connection.query(sql.car_info.queryNum,function(err,result){
                if(result !=''){
                    res.json({data:result})
                }else{
                    res.json({message:'查询失败'})
                }
                connection.release();
            })
        })
    }
}
var carrepairData={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // var param = req.query || req.params;
            var param=req.body;
            connection.query(sql.car_repair.insert, [param.carId,param.plateId,param.isFault,param.charge,param.repairParts,param.repairPay,param.exp], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.plateId;
            connection.query(sql.car_repair.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.carId == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_repair.update, [ param.carId,param.isFault,param.charge,param.repairParts,param.repairPay,param.exp,param.plateId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.car_repair.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
}
//课程管理
var classInfor={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // var param = req.query || req.params;
            var param=req.body;
            connection.query(sql.class_infor.insert, [param.classId,param.className,param.classTeacher,param.startTime,param.endTime,param.timeSlot,param.numbers], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.classId;
            connection.query(sql.class_infor.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.classId==null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.class_infor.update, [ param.className,param.classTeacher,param.startTime,param.endTime,param.timeSlot,param.classId], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.class_infor.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
}
//banner管理
var banner={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param=req;
            connection.query(sql.banner.insert, [param], function(err, result) {
                if (result) {
                    result = 'add'
                }
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.name;
            connection.query(sql.banner.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.banner.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
}
//新闻管理
var news={
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param=req.body;
            console.log(param)
            connection.query(sql.news.insert, [param.id_news,param.title_news,param.time_news,param.infor_news], function(err, result) {
                console.log(result)
                if (result) {
                    result = 'add'
                }
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var param=req.body;
        pool.getConnection(function(err, connection) {
            var id = param.id_news;
            console.log(id)
            connection.query(sql.news.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.news.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'select',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryId:function(req,res,next){
        var param = req.query || req.params
        pool.getConnection(function(err, connection) {
            var id = param.id_news;
            connection.query(sql.news.queryId, id, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'select',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
}

module.exports = {
    userData,
    stuInforData,
    stuExamData,
    stuTrainData,
    teacherInforData,
    teacherWagesData,
    carInfoData,
    carrepairData,
    classInfor,
    banner,
    news,
    check
};