import * as adService from "../services/adService.js";

export async function getAllAds(req, res) {
  try {
    const ads = await adService.getAllAds();
    return res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return res.status(500).json({
      message: "Error fetching ads.",
    });
  }
}

export async function getMyAds(req, res) {
  const userId = req.user.id;

  try {
    const ads = await adService.getAdsByUser(userId);
    return res.json(ads);
  } catch (error) {
    console.error("Error fetching my ads:", error);
    return res.status(500).json({
      message: "Error fetching my ads.",
    });
  }
}

export async function getAdById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const ad = await adService.getAdById(id, userId);
    return res.json(ad);
  } catch (error) {
    console.error("Error fetching ad:", error);

    if (error.message === "Ad not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "You do not have permission to access this ad.") {
      return res.status(403).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching ad.",
    });
  }
}

export async function createAd(req, res) {
  const { title, description, price, photo_url, condition, category_id } = req.body;
  const userId = req.user.id;

  if (!title || !description || !price || !photo_url || !condition || !category_id) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  if (condition !== "NEW" && condition !== "USED") {
    return res.status(400).json({
      message: "Condition must be NEW or USED.",
    });
  }

  try {
    const ad = await adService.createAd({
      title,
      description,
      price,
      photo_url,
      condition,
      category_id,
      user_id: userId,
    });

    return res.status(201).json({
      message: "Ad created successfully!",
      ad,
    });
  } catch (error) {
    console.error("Error creating ad:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error creating ad.",
    });
  }
}

export async function updateAd(req, res) {
  const { id } = req.params;
  const { title, description, price, photo_url, condition, category_id } = req.body;
  const userId = req.user.id;

  if (!title || !description || !price || !photo_url || !condition || !category_id) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  if (condition !== "NEW" && condition !== "USED") {
    return res.status(400).json({
      message: "Condition must be NEW or USED.",
    });
  }

  try {
    const ad = await adService.updateAd(id, { title, description, price, photo_url, condition, category_id }, userId);

    return res.json({
      message: "Ad updated successfully!",
      ad,
    });
  } catch (error) {
    console.error("Error updating ad:", error);

    if (error.message === "Ad not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "You do not have permission to edit this ad.") {
      return res.status(403).json({
        message: error.message,
      });
    }

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error updating ad.",
    });
  }
}

export async function deleteAd(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await adService.deleteAd(id, userId);
    return res.json(result);
  } catch (error) {
    console.error("Error deleting ad:", error);

    if (error.message === "Ad not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "You do not have permission to delete this ad.") {
      return res.status(403).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error deleting ad.",
    });
  }
}
