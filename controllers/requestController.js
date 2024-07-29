import { Request } from '../models/requestModal.js';

export async function createRequest(req, res) {
  try {
    const callback = await Request.create(req.body);
    res.status(201).json({ message: 'Callback request created successfully', callback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllRequest(req, res) {
  try {
    const callbacks = await Request.find({},'createdAt fullname email mobile location service -_id').sort({createdAt: -1});
    const formattedCallbacks = callbacks.map(callback => ({
      ...callback.toObject(),
      createdAt: new Date(callback.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }));
    res.status(200).json(formattedCallbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}