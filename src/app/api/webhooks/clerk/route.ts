import {Webhook} from "svix";
import {headers} from "next/headers";
import {WebhookEvent} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function POST(req: Request) {
  const {CLERK_WEBHOOK_SECRET} = process.env;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const {id} = evt.data;
  const eventType = evt.type;

  console.log("Received clerk request");
  if (eventType === "user.created" || eventType === "user.updated") {
    const {email_addresses, primary_email_address_id} = evt.data;
    const emailObject = email_addresses?.find((email) => {
      return email.id === primary_email_address_id;
    });
    console.log("User id", evt.data.id);
    if (!emailObject || !evt.data.username) {
      return Response.json(
        {error: "No email or username"},
        {
          status: 400,
        },
      );
    }
    try {
      await prisma.user.upsert({
        where: {id},
        update: {
          username: evt.data.username,
          email: emailObject.email_address,
          imageUrl: evt.data.image_url,
        },
        create: {
          id,
          username: evt.data.username,
          email: emailObject.email_address,
          imageUrl: evt.data.image_url,
        },
      });
    } catch (err) {
      console.log("Failed clerk wekbhook", eventType);
      return Response.json(
        {error: err},
        {
          status: 400,
        },
      );
    }
  }

  console.log(`User ${id} was ${eventType}`);

  return new Response(null, {status: 200});
}

export async function GET() {
  return redirect("/");
}
