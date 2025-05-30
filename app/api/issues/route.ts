import { NextRequest, NextResponse } from "next/server";
import {PrismaClient}  from "@prisma/client";
import { createIssueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
const prisma = new PrismaClient();
export async function POST(request:NextRequest){
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({error:"Unauthorized"},{status:401});
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status:400})
    const newIssue = await prisma.issue.create({
        data:{
            title: body.title,
            description: body.description,
            user: { connect: { id: session.user.id } }
        }
    });
    return NextResponse.json(newIssue,{status:201});
}