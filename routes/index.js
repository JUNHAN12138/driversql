//router/index.js
var formidable=require('formidable')
var path=require('path');
var fs=require('fs')

var express = require('express');
var router = express.Router();
var user = require('../modules/handle');
const { JsonWebTokenError } = require('jsonwebtoken');

/*用户信息 */
router.post('/check',function(req,res){
    user.check.query(req,res);
})
router.post('/login',function(req,res,next){
    user.userData.query(req,res,next);
})
router.post('/addUser', function(req, res, next) {
    user.userData.add(req, res, next);
});
router.get('/queryUser', function(req, res, next) {
    user.userData.queryAll(req, res, next);
});
router.post('/deleteUser', function(req, res, next) {
    user.userData.delete(req, res, next);
});
router.post('/updateUser', function(req, res, next) {
    user.userData.update(req, res, next);
});
router.post('/queryId',function(req,res,next){
    user.userData.queryId(req,res,next);
})
//学员信息管理
router.post('/addStu/infor',function(req,res,next){
    user.stuInforData.add(req,res,next);
})
router.get('/queryStu/infor',function(req,res,next){
    user.stuInforData.queryAll(req,res,next);
})
router.post('/deleteStu/infor',function(req,res,next){
    user.stuInforData.delete(req,res,next);
})
router.post('/updateStu/infor',function(req,res,next){
    user.stuInforData.update(req,res,next);
})
//学员考试管理
router.post('/addStu/exam',function(req,res,next){
    user.stuExamData.add(req,res,next);
})
router.get('/queryStu/exam',function(req,res,next){
    user.stuExamData.queryAll(req,res,next);
})
router.post('/deleteStu/exam',function(req,res,next){
    user.stuExamData.delete(req,res,next);
})
router.post('/updateStu/exam',function(req,res,next){
    user.stuExamData.update(req,res,next);
})
//学员培训管理
router.get('/queryStu/train',function(req,res,next){
    user.stuTrainData.queryAll(req,res,next);
})
router.post('/updateStu/train',function(req,res,next){
    user.stuTrainData.update(req,res,next);
})
//教练信息管理
router.post('/addTeacher/infor',function(req,res,next){
    user.teacherInforData.add(req,res,next);
})
router.get('/queryTeacher/infor',function(req,res,next){
    user.teacherInforData.queryAll(req,res,next);
})
router.post('/updateTeacher/infor',function(req,res,next){
    user.teacherInforData.update(req,res,next);
})
router.post('/deleteTeahcer/infor',function(req,res,next){
    user.teacherInforData.delete(req,res,next);
})
//教练工资管理
router.post('/addTeacher/wages',function(req,res,next){
    user.teacherWagesData.add(req,res,next);
})
router.get('/queryTeacher/wages',function(req,res,next){
    user.teacherWagesData.queryAll(req,res,next);
})
router.post('/updateTeacher/wages',function(req,res,next){
    user.teacherWagesData.update(req,res,next);
})
//车辆管理
router.get('/queryCar/info',function(req,res,next){
    user.carInfoData.queryAll(req,res,next);
})
router.get('/queryExamine/info',function(req,res,next){
    user.carInfoData.query(req,res,next);
})
router.post('/addCar/info',function(req,res,next){
    user.carInfoData.add(req,res,next);
})
router.post('/examine/info',function(req,res,next){
    user.carInfoData.examine(req,res,next);
})
router.post('/updateCar/info',function(req,res,next){
    user.carInfoData.update(req,res,next);
})
router.post('/deleteCar/info',function(req,res,next){
    user.carInfoData.delete(req,res,next);
})
router.get('/queryNums/info',function(req,res,next){
    user.carInfoData.queryNum(req,res,next);
})
//车辆报修管理
router.post('/addCar/repair',function(req,res,next){
    user.carrepairData.add(req,res,next);
})
router.get('/queryCar/repair',function(req,res,next){
    user.carrepairData.queryAll(req,res,next);
})
router.post('/updateCar/repair',function(req,res,next){
    user.carrepairData.update(req,res,next);
})
router.post('/deleteCar/repair',function(req,res,next){
    user.carrepairData.delete(req,res,next);
})
//课程表管理
router.post('/addClass/infor',function(req,res,next){
    user.classInfor.add(req,res,next)
})
router.get('/queryClass/infor',function(req,res,next){
    user.classInfor.queryAll(req,res,next)
})
router.post('/updateClass/infor',function(req,res,next){
    user.classInfor.update(req,res,next)
})
router.post('/deleteClass/infor',function(req,res,next){
    user.classInfor.delete(req,res,next)
})
//新闻管理
router.post('/addNews/infor',function(req,res,next){
    user.news.add(req,res,next);
})
router.get('/queryNews/infor',function(req,res,next){
    user.news.queryAll(req,res,next);
})
router.post('/queryNewsId/infor',function(req,res,next){
    user.news.queryId(req,res,next);
})
router.post('/deleteNews/infor',function(req,res,next){
    user.news.delete(req,res,next);
})

//上传图片
router.post('/upload/stu', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/stu/');
    // 解析 formData 数据
    form.parse(req, (err, fields, files) => {
        if (err) return next(err)
        let imgPath = files.file.path;
        let imgName = files.file.name;
        //新路径
        let newPath = path.resolve(__dirname, '../public/images/stu/') + '/' + imgName;
        fs.readFile(path.resolve(__dirname,'../public/images/stu/')+'/',function(err,data){
            if(err){
              console.log('读取到文件');
            }else{
              fs.unlink(imgName,(err)=>{
                if(err) throw err;
                console.log('文件已被删除')
              })
            }
        })
        fs.rename(imgPath, newPath, err => {
            if (err) {
                console.log('有错误', err);
            } else {
                console.log('重命名成功');
            }
        })
        // 返回路径和文件名
        res.json({ code: 1, data: { name: imgName, path: imgPath } });
    })
});
router.post('/upload/teacher', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/teacher/');
    // 解析 formData 数据
    form.parse(req, (err, fields, files) => {
        if (err) return next(err)
        let imgPath = files.file.path;
        let imgName = files.file.name;
        //新路径
        let newPath = path.resolve(__dirname, '../public/images/teacher/') + '/' + imgName;
        fs.readFile(path.resolve(__dirname,'../public/images/teacher/')+'/',function(err,data){
            if(err){
              console.log('读取到文件');
            }else{
              fs.unlink(imgName,(err)=>{
                if(err) throw err;
                console.log('文件已被删除')
              })
            }
        })
        fs.rename(imgPath, newPath, err => {
            if (err) {
                console.log('有错误', err);
            } else {
                console.log('重命名成功');
            }
        })
        // 返回路径和文件名
        res.json({ code: 1, data: { name: imgName, path: imgPath } });
    })
});
router.post('/upload/user', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/user/');
    // 解析 formData 数据
    form.parse(req, (err, fields, files) => {
        if (err) return next(err)
        let imgPath = files.file.path;
        let imgName = files.file.name;
        //新路径
        let newPath = path.resolve(__dirname, '../public/images/user/') + '/' + imgName;
        fs.readFile(path.resolve(__dirname,'../public/images/user/')+'/',function(err,data){
            if(err){
              console.log('读取到文件');
            }else{
              fs.unlink(imgName,(err)=>{
                if(err) throw err;
                console.log('文件已被删除')
              })
            }
        })
        fs.rename(imgPath, newPath, err => {
            if (err) {
                console.log('有错误', err);
            } else {
                console.log('重命名成功');
            }
        })
        // 返回路径和文件名
        res.json({ code: 1, data: { name: imgName, path: imgPath } });
    })
});
router.post('/upload/car', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/car/');
    // 解析 formData 数据
    form.parse(req, (err, fields, files) => {
        if (err) return next(err)
        let imgPath = files.file.path;
        let imgName = files.file.name;
        //新路径
        let newPath = path.resolve(__dirname, '../public/images/car/') + '/' + imgName;
        fs.readFile(path.resolve(__dirname,'../public/images/car/')+'/',function(err,data){
            if(err){
              console.log('读取到文件');
            }else{
              fs.unlink(imgName,(err)=>{
                if(err) throw err;
                console.log('文件已被删除')
              })
            }
        })
        fs.rename(imgPath, newPath, err => {
            if (err) {
                console.log('有错误', err);
            } else {
                console.log('重命名成功');
            }
        })
        // 返回路径和文件名
        res.json({ code: 1, data: { name: imgName, path: imgPath } });
    })
});
//上传banner
router.post('/upload/banner', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/banner/');
    // 解析 formData 数据
    form.parse(req, (err, fields, files) => {
        if (err) return next(err)
        let imgPath = files.file.path;
        let imgName = files.file.name;
        user.banner.add(imgName);
        //新路径
        let newPath = path.resolve(__dirname, '../public/images/banner/') + '/' + imgName;
        fs.readFile(path.resolve(__dirname,'../public/images/banner/')+'/',function(err,data){
            if(err){
              console.log('读取到文件');
            }else{
              fs.unlink(newPath,(err)=>{
                if(err) throw err;
                console.log('文件已被删除')
              })
            }
        })
        fs.rename(imgPath, newPath, err => {
            if (err) {
                console.log('有错误', err);
            } else {
                console.log('重命名成功');
            }
        })
        // 返回路径和文件名
        res.json({ code: 1, data: { name: imgName, path: imgPath } });
    })
});
//删除banner
router.post('/upload/banner_delete',function(req,res,next){
    user.banner.delete(req,res,next);
    const param=req.body;
    const pathname=path.resolve(__dirname, '../public/images/banner/')+'/'+param.name;
    fs.readFile(path.resolve(__dirname, '../public/images/banner/') + '/', function (err, data) {
        fs.unlink(pathname, (err) => {
            if(err) throw err;
            console.log('文件已被删除')
        })
    })
})
router.get('/upload/banner_query',function(req,res,next){
    user.banner.queryAll(req,res,next);
})
router.post('/upload/car_delete',function(req,res,next){
    const param=req.body;
    const pathname=path.resolve(__dirname, '../public/images/car/')+'/'+param.name;
    fs.readFile(path.resolve(__dirname, '../public/images/car/') + '/', function (err, data) {
        fs.unlink(pathname, (err) => {
            if(err) throw err;
            console.log('文件已被删除')
        })
    })
})

module.exports = router;