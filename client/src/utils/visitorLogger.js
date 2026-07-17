/**
 * Utility to capture visitor information and (optionally) log it to a service.
 */
export const logVisitorInfo = async () => {
  try {
    // 1. Client-side data collection (Backend handles IP & location for privacy/CORS)
    let geoData = { ip: "Client-Side Capture", country_name: "Internal", city: "Internal", org: "Internal" };


    // 2. Gather other browser information
    const visitorData = {
      ip: geoData.ip || "Unknown",
      country: geoData.country_name || "Unknown",
      city: geoData.city || "Unknown",
      org: geoData.org || "Unknown",
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || "Direct",
      fullUrl: window.location.href,
      page: window.location.pathname,
    };

    console.log("Visitor Metadata Captured:", visitorData);

    // 3. Send this data to the PHP backend (using absolute-like path)
    try {
      const response = await fetch(window.location.origin + "/api/log.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorData),
      });
      const result = await response.json();
      console.log("Server response:", result);
    } catch (apiError) {
      console.error("Failed to send data to backend:", apiError);
    }

    return visitorData;
  } catch (error) {
    console.error("Failed to capture visitor info:", error);
  }
};
