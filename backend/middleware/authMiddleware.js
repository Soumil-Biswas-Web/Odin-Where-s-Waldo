import theAuthAPI from "theauthapi";

export const authMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  console.log(apiKey);

  if (!apiKey) {
    return res.status(401).json({ message: "No API key provided" });
  }

  try {
    const keys = await theAuthAPI.apiKeys.getKeys();
  } catch (error) {
    console.log(error);
  }

  try {

    const isValidKey = await theAuthAPI.apiKeys.isValidKey(apiKey);

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

