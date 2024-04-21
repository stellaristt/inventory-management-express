const jwt = require('jsonwebtoken');

const authorizeAdmin = (req, res, next) => {
  // Mendapatkan token dari header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Memverifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Memeriksa apakah pengguna memiliki peran "admin"
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Jika token dan peran valid, lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Tangani kesalahan saat memverifikasi atau dekripsi token
    console.error('Authorization error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authorizeAdmin;
