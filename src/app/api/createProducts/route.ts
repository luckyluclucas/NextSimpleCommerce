import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session || session.user?.role !== "admin" || request.method !== "POST") {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    const data = await request.formData();
    const product = data.get("product");
    const image = data.get("image");

    console.log(image, product);
    return NextResponse.json({ message: "hello" }, { status: 200 });
}

export async function GET(request: NextRequest) {
    return NextResponse.redirect(new URL("/createProducts", request.url));
}
