import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const {email} = await request.json();

        if (!email) {
            return NextResponse.json({error: 'Email is required'}, {status: 400})
        }

        await resend.contacts.create({
            email: email,
            audienceId: process.env.RESEND_AUDIENCE_ID as string,
        })

        await resend.emails.send({
            from: 'Dashbored <waitlist@socialdashbored.com>',
            to: email,
            subject: 'Welcome to the boring family',
            html: '<p> Thank you for signing up! We\'ll notify you when our platform is ready.</p>'
        })

        return NextResponse.json({message: 'Subscripbed successfully'}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Error subscribing'}, {status: 500})
    }
}