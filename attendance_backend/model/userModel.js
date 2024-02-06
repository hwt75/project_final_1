const CommonModel = require("./commonModel");

class UserModel extends CommonModel {
  async getAllData() {
    return await this.executeQuery("SELECT * FROM student");
  }

  async getById(id) {
    return await this.executeQuery(
      `SELECT * FROM student WHERE id = '${id}'`
    );
  }

  async checkIdExists(id) {
    return await this.executeQuery(
      `SELECT COUNT(*) FROM student WHERE id = '${id}'`
    );
  }
  async checkStudentExists(studentId){
    return await this.executeQuery(
      `SELECT COUNT(*) FROM student WHERE studentId = '${studentId}'`
    )
  }
  async addUser(user) {
    return await this
      .executeQuery(`INSERT INTO student (id, name, email, birth, studentId, address, phoneNumber, hometown) VALUES('${user.id}', '${user.name}','${user.email}', '${user.birth ?? 0}','${user.studentId}','${user.address ?? ""}','${user.phoneNumber ?? ""}','${user.hometown ?? ""}')`);
  }
  async removeUserById(id) {
    return await this.executeQuery(`DELETE FROM student WHERE id = '${id}'`);
  }
  async updateUserById(user) {
    return await this.executeQuery(
      `UPDATE student SET name = '${user.name}', email = '${user.email}', birth = '${user.birth ?? 0}', phoneNumber = '${user.phoneNumber ?? ""}', address = '${user.address ?? ""}', hometown = '${user.hometown ?? ""}'  WHERE id = '${user.id}'`
    );
  }
  async getCountUsers() {
    return await this.executeQuery(
      'SELECT COUNT(*) FROM student'
    )
  }
}
module.exports = new UserModel();
