exports.logout = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging out" });
  }
};
