
const Item = require('../Models/Item');


exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ userID: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createItem = async (req, res) => {
  try {
    const { itemName, description, quantity } = req.body;

    const newItem = await Item.create({
      userID:    req.user.id,
      itemName,
      description,
      quantity
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sorry...Server is down' });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Ownership check
    if (item.userID.toString() !== req.user.id) {
      return res.status(403).json({ message: "You're not the user of this item" });
    }

    // Apply any provided updates
    item.itemName    = req.body.itemName    || item.itemName;
    item.description = req.body.description || item.description;
    item.quantity    = req.body.quantity    ?? item.quantity; 

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.userID.toString() !== req.user.id) {
      return res.status(403).json({ message: "You're not the user of this item" });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sorry...Server is down' });
  }
};

