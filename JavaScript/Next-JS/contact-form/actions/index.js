"use server";

import Contact from "@/models/Contact.js";
import dbConnect from "@/lib/db.js";
import { revalidatePath } from "next/cache";

export async function createContact(formData) {
  try {
    await dbConnect();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    revalidatePath("/contacts");

    return {
      success: true,
      message: "Message sent successfully!",
      contactId: contact._id.toString(),
    };
  } catch (error) {
    console.log("Error creating contact:", error);

    return {
      success: false,
      error: "Something went wrong, please try again",
    };
  }
}

export async function getContacts() {
  try {
    await dbConnect();

    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt?.toString(),
      updatedAt: contact.updatedAt?.toString(),
    }));
  } catch (error) {
    console.log("Error fetching contacts:", error);

    return [];
  }
}

export async function updateContact(contactId, status) {
  try {
    if (!contactId || !status) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    await dbConnect();

    await Contact.findByIdAndUpdate(contactId, {
      status,
    });

    revalidatePath("/contacts");

    return {
      success: true,
    };
  } catch (error) {
    console.log("Error updating contact status:", error);

    return {
      success: false,
      error: "Failed to update status",
    };
  }
}
