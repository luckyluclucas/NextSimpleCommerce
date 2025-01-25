import { NextRequest, NextResponse } from "next/server";
import { product } from "@/app/types/product";

const products: product[] = [
    {
        title: "Monitor LG ULTRAGEAR 144hz 1080p FUll HD com Display Port e HDMI 2.1",
        imageSrc: "/monitor_gamer.jpg",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "797,98",
        id: 0,

    },
    {
        title: "Monitor LG ULTRAGEAR 144hz 1080p FUll HD com Display Port e HDMI 2.1",
        imageSrc: "/monitor_gamer.jpg",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "797,98",
        id: 5,

    },
    {
        title: "Monitor LG ULTRAGEAR 144hz 1080p FUll HD com Display Port e HDMI 2.1",
        imageSrc: "/monitor_gamer.jpg",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "797,98",
        id: 6,

    },

    {
        title: "cup",
        imageSrc: "https://images.unsplash.com/photo-1722888061836-b3bae5fc5320?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "999,90",
        id: 1,
    },

    {
        title: "cup",
        imageSrc: "https://images.unsplash.com/photo-1722888061836-b3bae5fc5320?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "999,90",
        id: 2,
    },

    {
        title: "cup",
        imageSrc: "https://images.unsplash.com/photo-1722888061836-b3bae5fc5320?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "999,90",
        id: 3,
    },

    {
        title: "cup",
        imageSrc: "https://images.unsplash.com/photo-1722888061836-b3bae5fc5320?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "999,90",
        id: 4,
    },
    {
        title: "Monitor LG ULTRAGEAR 144hz 1080p FUll HD com Display Port e HDMI 2.1",
        imageSrc: "/monitor_gamer.jpg",
        description: "The absolute best mouse of all times, it's so good that itś hard to describe how good itś, because it's that good",
        price: "797,98",
        id: 8,

    },
]

export async function GET(req: NextRequest, res: NextResponse<product>) {
    try {
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}