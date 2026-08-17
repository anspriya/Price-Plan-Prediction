// ==========================================
// CUSTOMER API CONFIGURATION
// ==========================================

// Backend FastAPI server
const API_BASE_URL = "http://127.0.0.1:8001";


// ==========================================
// API REQUEST HELPER
// ==========================================

async function apiRequest(url, options = {}) {

  try {

    const response = await fetch(url, {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });


    // ========================================
    // HANDLE HTTP ERRORS
    // ========================================

    if (!response.ok) {

      let message =
        `API Error: ${response.status}`;

      try {

        const data =
          await response.json();

        if (data.detail) {
          message = data.detail;
        }

      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(message);
    }


    // ========================================
    // RETURN JSON RESPONSE
    // ========================================

    return await response.json();

  } catch (error) {

    // ========================================
    // CONNECTION ERROR
    // ========================================

    if (
      error.name === "TypeError" &&
      error.message.includes("fetch")
    ) {

      throw new Error(
        "Unable to connect to the backend server. " +
        "Please make sure FastAPI is running on port 8001."
      );
    }

    throw error;
  }
}


// ==========================================
// GET ALL CUSTOMERS
// ==========================================

export async function getCustomers() {

  return apiRequest(
    `${API_BASE_URL}/customers/`
  );
}


// ==========================================
// GET CUSTOMER
// ==========================================

export async function getCustomer(
  customerNumber
) {

  if (!customerNumber) {

    throw new Error(
      "Customer number is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/${encodeURIComponent(
      customerNumber
    )}`
  );
}


// ==========================================
// GET CUSTOMER USAGE
// ==========================================

export async function getCustomerUsage(
  customerNumber
) {

  if (!customerNumber) {

    throw new Error(
      "Customer number is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/${encodeURIComponent(
      customerNumber
    )}/usage`
  );
}


// ==========================================
// CREATE CUSTOMER
// ==========================================

export async function createCustomer(
  customerData
) {

  if (!customerData) {

    throw new Error(
      "Customer data is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/`,
    {
      method: "POST",

      body: JSON.stringify(
        customerData
      ),
    }
  );
}


// ==========================================
// CREATE CUSTOMER USAGE
// ==========================================

export async function createCustomerUsage(
  customerNumber,
  usageData
) {

  if (!customerNumber) {

    throw new Error(
      "Customer number is required."
    );
  }

  if (!usageData) {

    throw new Error(
      "Usage data is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/${encodeURIComponent(
      customerNumber
    )}/usage`,
    {
      method: "POST",

      body: JSON.stringify(
        usageData
      ),
    }
  );
}


// ==========================================
// UPDATE CUSTOMER
// ==========================================

export async function updateCustomer(
  customerNumber,
  customerData
) {

  if (!customerNumber) {

    throw new Error(
      "Customer number is required."
    );
  }

  if (!customerData) {

    throw new Error(
      "Customer data is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/${encodeURIComponent(
      customerNumber
    )}`,
    {
      method: "PUT",

      body: JSON.stringify(
        customerData
      ),
    }
  );
}


// ==========================================
// DELETE CUSTOMER
// ==========================================

export async function deleteCustomer(
  customerNumber
) {

  if (!customerNumber) {

    throw new Error(
      "Customer number is required."
    );
  }

  return apiRequest(
    `${API_BASE_URL}/customers/${encodeURIComponent(
      customerNumber
    )}`,
    {
      method: "DELETE",
    }
  );
}


// ==========================================
// EXPORT API BASE URL
// ==========================================

export {
  API_BASE_URL
};