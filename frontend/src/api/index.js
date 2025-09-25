import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const InquiryService = {
  async createInquiry(data) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contacts/`, data);

      return response.data;
    } catch (error) {
      console.log("Unable to create inquiry!", error);
    }
  },
};
