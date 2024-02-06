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

        const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    await attendance.countDocuments({
      arrival_time: {
          $gte: todayStart,
          $lte: todayEnd
      }})
      .then(data => {
        staticsData.countAttendance = data
      })
      .catch((err) => {
        console.log(err);
      });
      await attendance.aggregate([
        {
            $match: {
                arrival_time: {
                    $gte: todayStart,
                    $lte: todayEnd
                }
            }
        },
        {
            $group: {
                _id: "$user_number"
            }
        },
        {
            $count: "count"
        }
    ])
  .then(data => {
    console.log(data);
    staticsData.countStudentAttendance = data[0].count
  })
  .catch((err) => {console.log(err);})
    res.json(staticsData);
  }
}

module.exports = new StatisticController();
