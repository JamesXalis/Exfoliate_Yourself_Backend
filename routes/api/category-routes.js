const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

router.get('/', async (req, res) => {
  try {
    let data = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(data);
  }
  catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product }]
    });

    if (!data) {
      return res.status(404).json("Invalid Field");
    }

    res.status(200).json(data);
  }
  catch (err) {
    res.json(err)
  }
});

  router.post('/', async (req, res) => {
    try {
      await Category.create(req.body)
      res.status(200).json("Category created")
    }
    catch (err) {
      res.json(err)
    }
});

router.put('/:id', async (req, res) => {
  try {
    let data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!data) {
      return res.status(404).json("Invalid Field");
    }

    res.status(200).json("Category updated");
  }
  catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!data) {
      return res.status(404).json("Invalid Field");
    }

    res.status(200).json("Category deleted")
  }
  catch (err) {
    res.json(err)
  }
});

module.exports = router;