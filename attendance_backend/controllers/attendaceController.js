const Attendance = require("../model/attendanceModel");
const UserModel = require("../model/userModel");
const mongoConfig = require("../config/mongodbConfig");
const mongoose = require("mongoose");

class AttendanceController {
  constructor() {
    mongoose
      .connect(mongoConfig.dbConfig, {
        user: mongoConfig.username,
        pass: mongoConfig.password,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to the database monggoes");
      })
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
      });
  }

  async attendance(req, res, next) {
    const { user_number, ip } = req.body;
    if (user_number) {
      await UserModel.checkStudentExists(user_number)
        .then(async (data) => {
          if (data[0]["COUNT(*)"] > 0) {
            Attendance.findOneAndUpdate(
              { user_number: user_number, leave_time: null },
              { $set: { leave_time: Date.now(), update_time: Date.now() } }
            )
              .then((attendance) => {
                if (attendance != null) {
                  return res.json({
                    success: true,
                    is_arrival: false,
                    message: "update successfully",
                  });
                } else {
                  const attendance = new Attendance({
                    user_number: user_number,
                    arrival_time: Date.now(),
                    created_at: Date.now(),
                    ip: ip ?? null,
                  });
                  attendance
                    .save()
                    .then(() => {
                      return res.json({
                        success: true,
                        is_arrival: true,
                        message: "Success Attendance",
                      });
                    })
                    .catch((err) => {
                      return res
                        .status(400)
                        .json("failed to update Attendance");
                    });
                }
              })
              .catch((err) => {
                (success = false), res.json(err);
              });
          } else {
            return res.status(404).json("failed to check student");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json("failed to check student");
        });
    } else {
      return res.status(400).json("Please enter a user number");
    }
  }
  
  async deleteByStudentId(studentId){
    if(studentId)
    {
      Attendance.deleteMany({user_number: studentId})
        .then((data) => {
          console.log(data);
          return true;
        })
        .catch((err)=>{
          console.log(err);
          return false;
        })
    }
  }

  autoScanAttendanceFuntion() {
    const currentTime = new Date.now();
    if (currentTime.getHours() > 23) {
      this.autoAttendance();
    }
  }

  autoAttendance = () => {
    const setTime = new Date();
    setTime.setHours(23);
    return Attendance.findOneAndUpdate(
      { leave_time: null },
      { $set: { leave_time: setTime, update_time: Date.now() } }
    )
      .then((attendance) => { 
        if (attendance != null) {
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  async autoAttendanceAsync(req, res, next) {
    const setTime = new Date();
    setTime.setHours(23);
    return await Attendance.findOneAndUpdate(
      { leave_time: null },
      { $set: { leave_time: setTime, update_time: Date.now() } }
    )
      .then((attendance) => {
        if (attendance != null) {
          res.json("Auto attendance successful!");
        }
      })
      .catch((err) => {
        console.log(err);
        res.json("Error during auto attendance");
      });
  }
}

module.exports = new AttendanceController();
