const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  let data = await Tag.findAll({
    include: [{ model: Product }],
  })
  res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  let data = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: Product }]
  });

  res.status(200).json(data);
});

router.post('/', async (req, res) => {
  await Tag.create(req.body)
  res.status(200).json("Tag created")
});

router.put('/:id', async (req, res) => {
  await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json("Tag updated")
});

router.delete('/:id', async (req, res) => {
  await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json("Tag deleted")
});

module.exports = router;