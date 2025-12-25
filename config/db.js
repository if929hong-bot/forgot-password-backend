const { Sequelize } = require('sequelize');
require('dotenv').config();

// 創建數據庫連接（兼容Zeabur MySQL的SSL配置，已适配Zeabur自动生成的环境变量名）
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || process.env.DB_NAME, // 兼容两种变量名（Zeabur自动生成MYSQL_DATABASE）
  process.env.MYSQL_USER || process.env.DB_USER,     // Zeabur自动生成MYSQL_USER
  process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD, // Zeabur自动生成MYSQL_PASSWORD
  {
    host: process.env.MYSQL_HOST || process.env.DB_HOST, // Zeabur自动生成MYSQL_HOST
    port: process.env.MYSQL_PORT || process.env.DB_PORT, // Zeabur自动生成MYSQL_PORT
    dialect: 'mysql',
    logging: false, // 關閉SQL日誌（開發時可改為console.log）
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // 解決Zeabur MySQL的SSL驗證問題
      }
    }
  }
);

// 測試數據庫連接
async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log('數據庫連接成功！');
  } catch (error) {
    console.error('數據庫連接失敗：', error);
  }
}

testDbConnection();

module.exports = sequelize;