import Theme from "../models/Theme.js";

export const getTheme = async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) theme = await Theme.create({});
    res.json({ data: theme });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) theme = new Theme();
    Object.assign(theme, req.body);
    await theme.save();
    res.json({ data: theme });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
