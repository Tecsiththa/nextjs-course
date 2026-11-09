import prisma from "@/lib/prisma";
import { getUser } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest){

   //check user kenek login una nadda kiyala balanna
    const requestedUser =  await getUser(request)

    if(requestedUser == null){

        return NextResponse.json(
            {
                message : "you need to be logged in to access this resource"
            },
            {
                status : 401
            }
        )
    }

    //user privileges athule users:read kiyana permission eka thiyanwada kiyala balanna
    if(requestedUser.privileges .includes("users:read")){

         const users = await prisma.user.findMany()

         return NextResponse.json(
        {
            message : "users fetched successfully",
            data : users
        }
    )

    }else{

        return NextResponse.json(
            {
                message : "you do not have permission to access this resource"
            },
            {
                status : 403
            }
        )
    }




   

}