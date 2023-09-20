import mysql from "@/utils/MysqlConnection"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const user = await request.json();

        await mysql.query(`INSERT INTO user (name, email , password) VALUES ("${user.username}", "${user.email}", "${user.password}")`)
        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const userData = await mysql.query("SELECT * FROM user");

        const JoinData = await mysql.query("SELECT user.id ,company.name FROM user RIGHT JOIN company  ON user.id = company.user_id");
        // const JoinData = await mysql.query("SELECT user.id , user.name , company.name , company.location FROM user CROSS JOIN company");

        const RightJoinResult = JSON.parse(JSON.stringify(JoinData));

        const results = JSON.parse(JSON.stringify(userData));

        return NextResponse.json({ results: results, companyresult: RightJoinResult }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const userData = await request.json();

        if (userData.username && userData.email && userData.password) {
            mysql.query(`UPDATE user set name = "${userData.username}" , email = "${userData.email}" , password = "${userData.password}" where id = "${userData.id}"`)
            return NextResponse.json({ status: 200 })
        } else {
            if (userData.username) {
                mysql.query(`UPDATE user set name = "${userData.username}" where id = "${userData.id}"`)
            }
            if (userData.email) {
                mysql.query(`UPDATE user set email = "${userData.email}" where id = "${userData.id}"`)
            }
            if (userData.password) {
                mysql.query(`UPDATE user set password = "${userData.password}" where id = "${userData.id}"`)
            }
            return NextResponse.json({ status: 200 })
        }
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const Id = request.nextUrl.searchParams.get('id');
        mysql.query(`DELETE FROM user WHERE id = "${Id}"`);

        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ status: 500 })
    }
}