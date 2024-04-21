const prisma = require("../db");

async function findTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        item: {
          select: {
            name: true
          }
        }
      }
    });
    return transactions;
  } catch (error) {
    throw new Error('Failed to fetch transactions');
  }
}

async function findTransactionsByUserId(userId) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        item: {
          select: {
            name: true
          }
        }
      }
    });
    return transactions;
  } catch (error) {
    throw new Error('Failed to fetch transactions by user ID');
  }
}

async function findTransactionById(id) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return transaction;
}

async function createTransaction(userId, itemId, quantityBorrowed) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        itemId,
        quantityBorrowed,
        status: "PENDING",
      },
    });
    return newTransaction;
  } catch (error) {
    throw new Error('Failed to create transaction');
  }
}

async function updateTransactionStatus(transactionId, status) {
  try {
    await prisma.transaction.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        status,
      },
    });
  } catch (error) {
    throw new Error('Failed to update transaction status');
  }
}

module.exports = {
  findTransactions,
  findTransactionsByUserId,
  findTransactionById,
  createTransaction,
  updateTransactionStatus,
};