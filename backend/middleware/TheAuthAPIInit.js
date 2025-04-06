import TheAuthAPI from "theauthapi";

// console.log("Access token: ", process.env.ACCESS_TOKEN)
const api = new TheAuthAPI(process.env.ACCESS_TOKEN, { retryCount: 5 });

export const authAPIKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  // console.log(apiKey);

  if (!apiKey) {
    return res.status(401).json({ message: "No API key provided" });
  }

  try {
    const user = await getUser(apiKey);
    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }
    
    req.user = user; // Attach user info to req object
    next(); // Continue to route handler

  } catch (error) {
    console.error('Error with TheAuthAPI:');
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createKey = async ( {email, username} ) => {
  try {    
    const newKey = await api.apiKeys.createKey({
      projectID: process.env.PROJECT_ID,
      name: username,
      customAccountId: email
    })
    console.log("Created Key: ", newKey);
    return newKey;
  } catch (error) {
    console.log("Error creating key: ");
    catchError(error);
  }
}

export const getAllKeys = async() => {
  try {
    const keys = await api.apiKeys.getKeys();
    return keys;
  } catch (error) {
    console.log("Error fetching keys: ");
    catchError(error);
  }
}

export const getKey = async(username) => {
  try {
    const [{key}] = await api.apiKeys.getKeys({
      projectID: process.env.PROJECT_ID,
      name: username,      
    });
    return key;
  } catch (error) {
    console.log(`Error fetching key for user ${username}: `);
    catchError(error);
  }
}

export const updateKey = async(apiKey) => {
  try {
    const updatedKey = await api.apiKeys.rotateKey(apiKey);
    console.log("Rotated Key: ", updatedKey);
    return updatedKey;
  } catch (error) {
    console.log("Error updating key: ");
    catchError(error);
  }
}

export const deleteKey = async (apiKey) => {
  try {
    const deletedKey = await api.apiKeys.deleteKey(apiKey);
    if (deletedKey) console.log("Key Deleted.");
    return true
  } catch (error) {
    console.log("Error deleting key: ");
    catchError(error);
  }
}

export const getUser = async (apiKey) => {
  try {
    const key = await api.apiKeys.getKeys(apiKey);
    return key;
  } catch (error) {
    console.log("Error fetching user from given key.");
    catchError(error);
  }
}

const catchError = (error) => {
  // if (error instanceof ApiResponseError) {
  //   // handle response error
  //   console.log("Response Error: ");
  // }
  // if (error instanceof ApiRequestError) {
  //   // handle network error
  //   console.log("Network Error: ");
  // }
  // else {
  //   // unknown error
  //   console.log("Untracable Error: ");
  // }
  throw error;
}