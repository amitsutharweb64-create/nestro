import Contact from "../models/contact.model.js";

// @desc Create new contact inquiry
// @route POST /api/contact/create
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
      status: "pending",
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

// @desc Get all inquiries with filters, search, pagination & stats
// @route GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";
    const subject = req.query.subject?.trim();
    const status = req.query.status?.trim();
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const query = {};

    // Search filter across name, email, phone, and message
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { message: regex },
      ];
    }

    // Subject filter
    if (subject && subject !== "all") {
      query.subject = subject;
    }

    // Status filter
    if (status && status !== "all") {
      if (status === "pending") {
        query.$or = query.$or
          ? [{ $and: [{ $or: query.$or }, { $or: [{ status: "pending" }, { status: { $exists: false } }, { status: null }] }] }]
          : [{ status: "pending" }, { status: { $exists: false } }, { status: null }];
      } else {
        query.status = status;
      }
    }

    const skip = (page - 1) * limit;

    // Execute query and counts in parallel
    const [rawContacts, totalInquiries, pendingCount, inProgressCount, resolvedCount, closedCount] =
      await Promise.all([
        Contact.find(query)
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit)
          .lean(),
        Contact.countDocuments(query),
        Contact.countDocuments({
          $or: [{ status: "pending" }, { status: { $exists: false } }, { status: null }],
        }),
        Contact.countDocuments({ status: "in_progress" }),
        Contact.countDocuments({ status: "resolved" }),
        Contact.countDocuments({ status: "closed" }),
      ]);

    const contacts = rawContacts.map((c) => ({
      ...c,
      status: c.status || "pending",
    }));

    const totalAll = await Contact.countDocuments();
    const totalPages = Math.ceil(totalInquiries / limit) || 1;

    return res.status(200).json({
      success: true,
      message: "Inquiries fetched successfully",
      data: contacts,
      pagination: {
        currentPage: page,
        limit,
        totalInquiries,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      stats: {
        total: totalAll,
        pending: pendingCount,
        in_progress: inProgressCount,
        resolved: resolvedCount,
        closed: closedCount,
      },
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch inquiries",
    });
  }
};

// @desc Get single inquiry by ID
// @route GET /api/contact/:id
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get Contact By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch inquiry",
    });
  }
};

// @desc Update inquiry status
// @route PATCH /api/contact/status/:id
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "in_progress", "resolved", "closed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry marked as ${status.replace("_", " ")}`,
      data: contact,
    });
  } catch (error) {
    console.error("Update Contact Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update inquiry status",
    });
  }
};

// @desc Delete an inquiry
// @route DELETE /api/contact/:id OR /api/contact/delete/:id
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete inquiry",
    });
  }
};
