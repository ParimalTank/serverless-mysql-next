import mysql from "@/utils/MysqlConnection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // await mysql.connect().then(res => {
        //     console.log("Connection Successfully");
        // })

        mysql.query("CREATE TABLE IF NOT EXISTS company (id int primary key auto_increment, user_id INTEGER(10) ,name VARCHAR(255), email VARCHAR(255) , location VARCHAR(255) , FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE )").then(() => {
            console.log("Table Created Successfully");
        }).catch((err) => {
            console.log("err: ", err);
            console.log("Errors in Table Creation");
        })

        mysql.query("INSERT INTO company (name, email,location , user_id) VALUES ('Google', 'parimal@google.com.rainit.com','HeadQuarter Hyderabad, Karnataka' , 1)").then(() => {
            console.log("Data Added Successfully");
        }).catch((err) => {
            console.log("err: ", err);
            console.log("Errors");
        })

        // mysql.query("CREATE TABLE IF NOT EXISTS user (id int primary key auto_increment, name VARCHAR(255), email VARCHAR(255) , password VARCHAR(255))").then(() => {
        //     console.log("Table Created Successfully");
        // }).catch((err) => {
        //     console.log("err: ", err);
        //     console.log("Errors in Table Creation");
        // })

        // mysql.query("INSERT INTO user (name, email , password) VALUES ('Parimal', 'parimal183@webmain.rainit.com','Hello')").then(() => {
        //     console.log("Data Added Successfully");
        // }).catch((err) => {
        //     console.log("Errors");
        // })

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}