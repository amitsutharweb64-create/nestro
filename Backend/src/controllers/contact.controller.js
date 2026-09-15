import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Required fields validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Save contact to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject,
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact Create Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
