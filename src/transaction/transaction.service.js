const transactionRepository = require("./transaction.repository");
const itemRepository = require('../item/item.repository');

const getAllTransactions = async () => {
  const transactions = await transactionRepository.findTransactions();
  return transactions;
};

const getTransactionsByUserId = async (userId) => {
    const transactions = await transactionRepository.findTransactionsByUserId(userId);
    return transactions;
  };

  async function getTransactionById(transactionId) {
    const transaction = await transactionRepository.findTransactionById(transactionId);
    return transaction;
  }

const borrowItem = async (userId, itemId, quantityBorrowed) => {
  const newTransaction = await transactionRepository.createTransaction(userId, itemId, quantityBorrowed);
  return newTransaction;
};

const verifyTransaction = async (transactionId, status) => {
  const transaction = await transactionRepository.findTransactionById(transactionId);
  if (!transaction) {
    throw new Error("Transaction not found.");
  }

  // Update status transaksi
  await transactionRepository.updateTransactionStatus(transactionId, status);

  // Jika statusnya "BORROWED", kurangi quantity pada model Item
  if (status === "BORROWED") {
    const item = await itemRepository.findItemById(transaction.itemId);
    if (!item) {
      throw new Error("Item not found.");
    }

    const newQuantity = item.quantity - transaction.quantityBorrowed;
    if (newQuantity < 0) {
      throw new Error("Insufficient quantity.");
    }

    await itemRepository.updateItemQuantity(item.id, newQuantity);
  }
};


async function returnItem(transactionId) {
  const transaction = await transactionRepository.findTransactionById(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (transaction.status !== "BORROWED") {
    throw new Error("Cannot return item. Transaction status is not BORROWED");
  }

  // Update transaction status to RETURNED
  await transactionRepository.updateTransactionStatus(transactionId, "RETURNED");

  // Update item quantity
  const item = await itemRepository.findItemById(transaction.itemId);
  const newQuantity = item.quantity + transaction.quantityBorrowed;
  await itemRepository.updateItemQuantity(item.id, newQuantity);
}

module.exports = {
  getAllTransactions,
  getTransactionsByUserId,
  getTransactionById,
  borrowItem,
  verifyTransaction,
  returnItem,
};
