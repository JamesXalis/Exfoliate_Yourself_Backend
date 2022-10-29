const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  let data = await Category.findAll({
    include: [{model: Product}],
  })
  res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  let data = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: Product }]
  });

  res.status(200).json(data);
});

  router.post('/', async (req, res) => {
    await Category.create(req.body)
    res.status(200).json("Category created")
});

router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json("Category updated")
});

router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json("Category deleted")
});

module.exports = router;