const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const { afterBulkSync } = require('../../models/Product');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
    try {
        let data = await Product.findAll({
            include: [{ model: Category }, { model: Tag }],
        })
        res.status(200).json(data);
    }
    catch (err) {
        res.json(err)
    }
});

// get one product
router.get('/:id', async (req, res) => {
    try {
        let data = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{ model: Category }, { model: Tag }],
        })
        res.status(200).json(data);
    }
    catch (err) {
        res.json(err)
    }
});

// create new product
router.post('/', (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});


router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.status(200).json(updatedProductTags))
        .catch((err) => {
            res.status(200).json(err);
        });
});

router.delete('/:id', async (req, res) => {
    try {
        data = await Product.destroy({
            where: {
                id: req.params.id,
            },
        })

        if (!data) {
            return res.status(404).json("Invalid Field");
        }

        res.status(200).json("Product deleted")
    }
    catch (err) {
        res.json(err)
    }
});

module.exports = router;