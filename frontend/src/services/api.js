const API_BASE_URL = "http://127.0.0.1:8000";


// ============================================================
// CHECK BACKEND
// ============================================================

export async function checkBackend() {

  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  if (!response.ok) {

    throw new Error(
      "Backend is not available."
    );

  }

  return response.json();
}


// ============================================================
// GET CUSTOMER
// ============================================================

export async function getCustomer(
  phoneNumber
) {

  const cleanPhone =
    String(phoneNumber).trim();


  if (!cleanPhone) {

    throw new Error(
      "Phone number is required."
    );

  }


  const response = await fetch(
    `${API_BASE_URL}/api/customers/${encodeURIComponent(
      cleanPhone
    )}`
  );


  if (!response.ok) {

    if (response.status === 404) {

      throw new Error(
        "Phone number not found in the dataset."
      );

    }


    throw new Error(
      "Unable to load customer data."
    );

  }


  return response.json();
}


// ============================================================
// GET RECOMMENDATIONS
//
// Backend returns:
//   recommendations → TOP 3
//   all_plans       → ALL 25
// ============================================================

export async function getRecommendations(
  phoneNumber
) {

  const cleanPhone =
    String(phoneNumber).trim();


  if (!cleanPhone) {

    throw new Error(
      "Phone number is required."
    );

  }


  const response = await fetch(
    `${API_BASE_URL}/api/recommendations/${encodeURIComponent(
      cleanPhone
    )}`
  );


  if (!response.ok) {

    if (response.status === 404) {

      throw new Error(
        "Customer not found in the dataset."
      );

    }


    let errorMessage =
      "Unable to load recommendation data.";


    try {

      const errorData =
        await response.json();


      if (errorData?.detail) {

        errorMessage =
          errorData.detail;

      }

    } catch {

      // Keep default error message

    }


    throw new Error(
      errorMessage
    );

  }


  return response.json();
}


// ============================================================
// COMPLETE CUSTOMER ANALYSIS
//
// Combines:
//   1. Customer information
//   2. Top 3 recommendations
//   3. All 25 tariff plans
// ============================================================

export async function analyzeCustomer(
  phoneNumber
) {

  const cleanPhone =
    String(phoneNumber).trim();


  if (!cleanPhone) {

    throw new Error(
      "Please enter a phone number."
    );

  }


  const [
    customer,
    recommendation
  ] = await Promise.all([

    getCustomer(cleanPhone),

    getRecommendations(cleanPhone)

  ]);


  return {

    // --------------------------------------------------------
    // CUSTOMER INFORMATION
    // --------------------------------------------------------

    ...customer,


    // --------------------------------------------------------
    // TOP 3 RECOMMENDATIONS
    // --------------------------------------------------------

    recommendations:
      recommendation?.recommendations ||
      [],


    // --------------------------------------------------------
    // ALL 25 PLANS
    // --------------------------------------------------------

    all_plans:
      recommendation?.all_plans ||
      [],


    // --------------------------------------------------------
    // NUMBER OF PLANS
    // --------------------------------------------------------

    total_plans:
      recommendation?.total_plans ||
      recommendation?.all_plans?.length ||
      0,


    // --------------------------------------------------------
    // BEST PLAN
    // --------------------------------------------------------

    best_plan:
      recommendation?.recommendations?.[0] ||
      null,


    // --------------------------------------------------------
    // CLUSTER
    // --------------------------------------------------------

    cluster:
      recommendation?.cluster ??
      customer?.cluster ??
      null,


    // --------------------------------------------------------
    // COMPLETE BACKEND RESPONSE
    // --------------------------------------------------------

    recommendationData:
      recommendation

  };

}


// ============================================================
// AI CHATBOT
//
// Sends the user's question to the FastAPI backend.
//
// Expected backend endpoint:
//
// POST /api/chat
//
// Request:
//
// {
//   message: "...",
//   customer: {...},
//   recommendations: [...]
// }
//
// Response:
//
// {
//   response: "...."
// }
//
// ============================================================

export async function sendChatMessage(
  message,
  customer = null,
  recommendations = []
) {

  const cleanMessage =
    String(message || "").trim();


  if (!cleanMessage) {

    throw new Error(
      "Please enter a message."
    );

  }


  try {

    const response = await fetch(
      `${API_BASE_URL}/api/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          // User's question
          message:
            cleanMessage,

          // Logged-in customer's data
          customer:
            customer || {},

          // Top 3 recommended plans
          recommendations:
            Array.isArray(
              recommendations
            )
              ? recommendations
              : [],

        }),

      }
    );


    // --------------------------------------------------------
    // BACKEND ERROR
    // --------------------------------------------------------

    if (!response.ok) {

      let errorMessage =
        "Unable to connect to the AI assistant.";


      try {

        const errorData =
          await response.json();


        if (
          errorData?.detail
        ) {

          errorMessage =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(
                  errorData.detail
                );

        }

      } catch {

        // Keep default error

      }


      throw new Error(
        errorMessage
      );

    }


    // --------------------------------------------------------
    // READ RESPONSE
    // --------------------------------------------------------

    const data =
      await response.json();


    console.log(
      "CHATBOT RESPONSE:",
      data
    );


    // --------------------------------------------------------
    // SUPPORT DIFFERENT BACKEND RESPONSE NAMES
    // --------------------------------------------------------

    const chatbotResponse =
      data?.response ||
      data?.message ||
      data?.answer ||
      data?.reply ||
      data?.text ||
      "";


    if (!chatbotResponse) {

      throw new Error(
        "The AI assistant returned an empty response."
      );

    }


    return {

      ...data,

      response:
        chatbotResponse,

    };

  } catch (error) {

    console.error(
      "CHATBOT API ERROR:",
      error
    );


    throw error;

  }

}


// ============================================================
// OPTIONAL: GET CHATBOT HEALTH
//
// Useful for testing whether the chatbot endpoint exists.
// ============================================================

export async function checkChatbot() {

  try {

    const response =
      await fetch(
        `${API_BASE_URL}/health`
      );


    if (!response.ok) {

      return false;

    }


    return true;

  } catch {

    return false;

  }

}