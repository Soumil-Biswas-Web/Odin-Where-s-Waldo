import TheAuthAPI from "theauthapi";

const api = new TheAuthAPI(process.env.ACCESS_TOKEN, { retryCount: 5 });
// const api = new TheAuthAPI("test_access_sVOVv9TqnJw9dOe4oeeLObY83TWlH9jDGlIPtLEaMJZkzay9X3uhHXGefB1AATvD");

export const authMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  console.log(apiKey);

  if (!apiKey) {
    return res.status(401).json({ message: "No API key provided" });
  }

  try {
    const keys = await api.apiKeys.getKeys();
  } catch (error) {
    console.log(error);
  }

  try {

    const isValidKey = await api.apiKeys.isValidKey(apiKey);

    if (isValidKey) {
      return next(); // Allow request to continue
    } else {
      return res.status(401).json({ message: "Invalid API key" });
    }
  } catch (error) {
    console.error('Error with TheAuthAPI:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

