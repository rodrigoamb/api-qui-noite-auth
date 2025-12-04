import * as userService from "../services/userService.js";

export async function getUserProfile(req, res) {
  const { id } = req.params;

  try {
    const profile = await userService.getUserProfile(id);
    return res.json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);

    if (error.message === "User not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching user profile.",
    });
  }
}

export async function getMyProfile(req, res) {
  const userId = req.user.id;

  try {
    const profile = await userService.getMyProfile(userId);
    return res.json(profile);
  } catch (error) {
    console.error("Error fetching my profile:", error);

    if (error.message === "User not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching my profile.",
    });
  }
}

export async function updateMyProfile(req, res) {
  const userId = req.user.id;
  const { name, phone, city, state, bio, avatar_url } = req.body;

  if (!name || !phone || !city || !state) {
    return res.status(400).json({
      message: "Name, phone, city and state are required.",
    });
  }

  try {
    const profile = await userService.updateMyProfile(userId, {
      name,
      phone,
      city,
      state,
      bio,
      avatar_url,
    });

    return res.json({
      message: "Profile updated successfully!",
      profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.message === "User not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error updating profile.",
    });
  }
}

export async function getMyStats(req, res) {
  const userId = req.user.id;

  try {
    const stats = await userService.getUserStats(userId);
    return res.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);

    if (error.message === "User not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching user stats.",
    });
  }
}
