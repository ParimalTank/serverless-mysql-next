import serverlessMysql from "serverless-mysql";

const mysql = serverlessMysql({
    config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USERNAME,
        password: process.env.PASSWORD
    }
})

mysql.connect()

export default mysql