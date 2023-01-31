import prisma from "../db";

// Get all
export const getAllProducts = async (req, res) => {
  console.log("req:", req);
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get one
export const getProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// Create product
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({
    data: product,
  });
};

// Update Data
export const updateProduct = async (req, res) => {
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

export const deleteProduct = async (req, res) => {
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
