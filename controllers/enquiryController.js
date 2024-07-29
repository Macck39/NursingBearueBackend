import { Enquiry } from '../models/enquiryModal.js';

export async function createEnquiry(req, res) {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ message: 'Enquiry created successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find({},'createdAt fullname mobile location email service message -_id').sort({ createdAt: -1 });
    const formattedEnquiries = enquiries.map(enquiry => ({
      ...enquiry.toObject(),
      createdAt: new Date(enquiry.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }));
    res.status(200).json(formattedEnquiries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}