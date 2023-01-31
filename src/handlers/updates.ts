import prisma from "../db";

// Get all for a user
export const getAllUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updateData = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updateData });
};

// Get one
export const getUpdate = async (req, res) => {
  const updateId = req.params.id;
  const updateData = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
  });

  res.json({ data: updateData });
};

// Create
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: "no product " });
  }

  const updateData = await prisma.update.create({
    data: req.body,
  });

  res.json({
    data: updateData,
  });
};

// Update Data
export const updateUpdate = async (req, res) => {
  const productId = req.params.id;

  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({
    data: updated,
  });
};

// Delete

export const deleteUpdate = async (req, res) => {
  const productId = req.params.id;
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({
    data: deleted,
  });
};
