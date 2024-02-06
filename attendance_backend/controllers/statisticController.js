const UserModel = require("../model/userModel");
const AttendanceController = require("./attendaceController");
const attendance = require("../model/attendanceModel");

class StatisticController {
  async getStaticsData(req, res, next) {
    var staticsData = {
      countStudent: 0,
      countAttendance: 0,
      countStudentAttendance: 0,
    };
    await UserModel.getCountUsers()
      .then((data) => {
        staticsData.countStudent = data[0]["COUNT(*)"];
      })
      .catch((err) => {
        console.log(err);
      });
    await attendance.countDocuments({})
      .then((data) => {
        staticsData.countAttendance = data;
        staticsData.countStudentAttendance = data;
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    res.json(staticsData);
  }
}

module.exports = new StatisticController();
