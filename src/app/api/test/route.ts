import mysql from "@/utils/MysqlConnection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await mysql.connect().then(res => {
            console.log("Connection Successfully");
        })

        mysql.query("CREATE TABLE IF NOT EXISTS user (id int primary key auto_increment, name VARCHAR(255), email VARCHAR(255) , password VARCHAR(255))").then(() => {
            console.log("Table Created Successfully");
        }).catch((err) => {
            console.log("err: ", err);
            console.log("Errors in Table Creation");
        })

        mysql.query("INSERT INTO user (name, email , password) VALUES ('Parimal', 'parimal183@webmain.rainit.com','Hello')").then(() => {
            console.log("Data Added Successfully");
        }).catch((err) => {
            console.log("Errors");
        })

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}