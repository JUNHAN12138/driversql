//sql.js
// SQL语句封裝
var user = {
    update1:'update user set token=? where username=?',
    insert:'INSERT INTO user(userId, username, password, realname,phone,email,photo) VALUES(?,?,?,?,?,?,?)',
    update:'UPDATE user SET username=?, password=?,phone=?,email=?,photo=?,autograph=? WHERE userId=?',
    delete: 'DELETE FROM user WHERE userId=?',
    query:'select userId,username,password from user where username=? and password=?',
    queryAll: 'SELECT userId,username,password,realname,role,phone,email,photo,autograph FROM user',
    queryId:'select * from user where userId=?'
};
var stu={
    insert:'INSERT INTO stu_infor(stuId,stuAdmi, stuName, stuSex, ID, isWork, stuHealthy, phone,trainingCar, nativePlace, currentPlace,stuPhoto) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
    update:'update stu_infor set stuName=?,stuAdmi=?,stuSex=?,ID=?,isWork=?,stuHealthy=?,phone=?,trainingCar=?,nativePlace=?,currentPlace=?,stuPhoto=? WHERE stuId=?',
    delete:'DELETE FROM stu_infor WHERE stuId=?',
    queryAll:'SELECT stuId,stuAdmi, stuName, stuSex, ID, isWork, stuHealthy, phone,trainingCar, nativePlace, currentPlace,stuPhoto FROM stu_infor'
};
var stu_exam={
    update:'update stu_exam set trainingCar=?,exam=?,appoint=?,appointDate=?,appointPlace=?,score1=?,score1date=?,score1Place=?,score2=?,score2date=?,score2Place=?,score3=?,score3date=?,score3Place=?,score4=?,score4date=?,score4Place=? where stuId=?',
    delete:'delete from stu_exam where stuId=?',
    queryAll:"select stuId,stuAdmi,stuName,stuSex,ID,phone,trainingCar,exam,appoint,appointPlace,DATE_FORMAT(appointDate,'%Y-%m-%d %H:%i:%s')appointDate,score1,DATE_FORMAT(score1date,'%Y-%m-%d %H:%i:%s')score1date,score1Place,score2,DATE_FORMAT(score2date,'%Y-%m-%d %H:%i:%s')score2date,score2Place,score3,DATE_FORMAT(score3date,'%Y-%m-%d %H:%i:%s')score3date,score3Place,score4,DATE_FORMAT(score4date,'%Y-%m-%d %H:%i:%s')score4date,score4Place from stu_exam"
};
var stu_train={
    update:'update stu_train set trainingMode=?,trainingCar=?,trainingTeacher=?,examPay=?,trainingID=?,trainingTime=?,trainingPlace=?,isExam=?,tuition=? where stuId=?',
    queryAll:"select i.stuId,i.stuAdmi,i.stuName,i.stuSex,i.ID,i.stuPhoto,i.phone,t.trainingMode,t.trainingCar,t.trainingTeacher,t.examPay,t.trainingID,t.isExam,t.tuition,DATE_FORMAT(t.trainingTime,'%Y-%m-%d %H:%i:%s')trainingTime,t.trainingPlace from stu_infor i,stu_train t where i.stuId=t.stuId"
}
var teacher={
    insert:'insert into teacher_infor(teacherId,teacherName,teacherSex,ID,photo,IsHealthy,Phone,nativePlace,currentPlace,teachYear,driverYear,praise,driverCar) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    update:'update teacher_infor set teacherName=?,teacherSex=?,ID=?,IsHealthy=?,Phone=?,nativePlace=?,currentPlace=?,teachYear=?,driverYear=?,praise=?,driverCar=?,photo=? where teacherId=?',
    delete:'delete from teahcer_infor where teacherId=?',
    queryAll:'select teacherId,teacherName,teacherSex,ID,photo,IsHealthy,Phone,nativePlace,currentPlace,teachYear,driverYear,praise,driverCar from teacher_infor'
}
var teacher_wages={
    insert:'insert into teacher_infor(teacherId,teacherName,teacherSex,ID,Photo,month,wages,deduction,bonus,totalWages) values(?,?,?,?,?,?,?,?,?,?)',
    update:'update teacher_infor set month=?,wages=?,deduction=?,bonus=?,totalWages=? where teacherId=?',
    queryAll:'select teacherId,teacherName,teacherSex,ID,Photo,month,wages,deduction,bonus,totalWages from teacher_infor'
}
var car_info={
    insert:"insert into car_info(plateId,carId,photo,unit,carname,repairCar,wareHouse,place,company,charge,email,phone,examine) values(?,?,?,?,?,?,?,?,?,?,?,?,'未通过')",
    update:'update car_info set carId=?,photo=?,unit=?,carname=?,repairCar=?,wareHouse=?,place=?,company=?,charge=?,email=?,phone=? where plateId=?',
    examine:"update car_info set examine='通过' where plateId=?",
    delete:'delete from car_info where plateId=?',
    queryAll:"select * from car_info where examine='通过'",
    query:"select * from car_info where examine='未通过'",
    queryNum:'select carId,SUM(unit)nums from car_info group by carId;'
}
var car_repair={
    insert:'insert into car_repair(carId,plateId,isFault,charge,repairParts,repairPay,exp) values(?,?,?,?,?,?,?)',
    update:'update car_repair set carId=?,isFault=?,charge=?,repairParts=?,repairPay=?,exp=? where plateId=?',
    delete:'delete from car_repair where plateId=?',
    queryAll:'select * from car_repair'
}
var class_infor={
    insert:'insert into class(classId,className,classTeacher,startTime,endTime,timeSlot,numbers) values(?,?,?,?,?,?,?)',
    queryAll:"select classId,className,classTeacher,DATE_FORMAT(startTime,'%Y-%m-%d %H:%i:%s')startTime,DATE_FORMAT(endTime,'%Y-%m-%d %H:%i:%s')endTime,timeSlot,numbers from class",
    update:'update class set className=?,classTeacher=?,startTime=?,endTime=?,timeSlot=?,numbers=? where classId=?',
    delete:'delete from class where classId=?'
}
var banner={
    insert:'insert into page(banner) values(?)',
    queryAll:'select banner as name from page',
    delete:'delete from page where banner=?'
}
var news={
    insert:'insert into news(id_news,title_news,time_news,infor_news) values(?,?,?,?)',
    queryAll:"select id_news,title_news,DATE_FORMAT(time_news,'%Y-%m-%d %H:%i:%s')time_news from news",
    queryId:"select id_news,title_news,DATE_FORMAT(time_news,'%Y-%m-%d %H:%i:%s')time_news,infor_news from news where id_news=?",
    delete:'delete from news where id_news=?'
}

module.exports = {
    user,
    stu,
    stu_exam,
    stu_train,
    teacher,
    teacher_wages,
    car_info,
    car_repair,
    class_infor,
    banner,
    news
};