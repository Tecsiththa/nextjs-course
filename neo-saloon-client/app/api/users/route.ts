import prisma from "@/lib/prisma";
import { getUser, isPrivileged } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest){

const havePrivilege = await isPrivileged(request, "users:read")

if(!havePrivilege){

    return NextResponse.json(
        {
            message : "you do not have the privilege to view users"
        },
        {
            status : 403
        }
    )
}


const users = await prisma.user.findMany({
    select: {
        id : true,
        email : true,
        phone : true,
        firstName : true,
        lastName : true,
        password : false,
        role : true,
        status : true,
        createdAt : true,
        lastLogin : true,
        privileges : true
    }
})

  return NextResponse.json(
        {
            message : "users fetched successfully",
            data : users
        }
    )









/*
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
    }*/




   

}