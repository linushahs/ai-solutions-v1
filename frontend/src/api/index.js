import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const InquiryService = {
  async createInquiry(data) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/contacts/`,
        data
      );

      return response.data;
    } catch (error) {
      console.log("Unable to create inquiry!", error);
    }
  },
};

export const ReviewService = {
  async createReview(data) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/reviews/`,
        data
      );

      return response.data;
    } catch (error) {
      console.log("Unable to create review!", error);
    }
  },

  async getAllReviews({ params }) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/reviews/`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log("Unable to fetch reviews!", error);
    }
  },
};

export const EventService = {
  async getUpcomingEvents() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/events/upcoming/`
      );
      return response.data;
    } catch (error) {
      console.log("Unable to fetch upcoming events!", error);
    }
  },
  async getPastEvents() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/events/past/`);
      return response.data;
    } catch (error) {
      console.log("Unable to fetch past events!", error);
    }
  },
};

export const BlogsService = {
  async getAllBlogs({ params }) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/blogs/`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log("Unable to fetch blogs!", error);
    }
  },
  async getBlogDetail(slug) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/blogs/${slug}/`);
      return response.data;
    } catch (error) {
      console.log("Unable to fetch blog detail!", error);
      throw error;
    }
  },
  async getBlogCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/categories/`);
      return response.data;
    } catch (error) {
      console.log("Unable to fetch blog categories!", error);
    }
  },
};
