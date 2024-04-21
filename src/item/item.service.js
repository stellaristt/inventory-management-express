const { findItems, findItemById, insertItem, deleteItem, editItem } = require("./item.repository");

async function getAllItems() {
  const items = await findItems();
  return items;
}

async function getItemById(id) {
  const item = await findItemById(id);
  if (!item) {
    throw Error("Item not found");
  }
  return item;
}

async function createItem(newItemData) {
  const newItem = await insertItem(newItemData);
  return newItem;
}

async function deleteItemById(id) {
  await getItemById(id);
  await deleteItem(id);
}

async function editItemById(id, itemData) {
  await getItemById(id);
  const updatedItem = await editItem(id, itemData);
  return updatedItem;
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  deleteItemById,
  editItemById,
};
