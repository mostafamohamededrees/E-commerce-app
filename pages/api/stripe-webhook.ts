import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import Srtipe, { Stripe } from "stripe";
import prisma from "@/libs/prismadb";


export const config = {
    api: {
        bodyParser: false,
    }
}


const stripe = new Srtipe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

export default async function handler(req:NextApiRequest , res:NextApiResponse) {


    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).send("Missing the stripe signature");
    }

    let event: Srtipe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    
    } catch (err: any) {
        return res.status(400).send(`Webhook error: ${err}`);
    }

    switch (event.type) {
        case "charge.succeeded":
            const charge: any = event.data.object as Stripe.Charge;

            if(typeof charge.payment_intent==="string" ) {
                await prisma?.order.update({
                    where: {
                        paymentIntentId: charge.payment_intent
                    },
                    data: {
                        status: "complete",
                        address: charge.shipping?.address
                    }
                })
            }
            break;
        default:
            console.log("Unhandled event type" + event.type);
    }

    res.json({ received: true });

}