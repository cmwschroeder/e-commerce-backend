const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if(!tagData) {
      res.status(404).json({ message: 'No tag with that id'});
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req body should look like: 
    {
      tag_name: "Tag",
    }
  */
  try {
  const tag = await Tag.create(req.body);
  //if there are product ids to add this tag to then do that
  if(req.body.productIds.length) {
    const productTagIdArr = req.body.productIds.map((product_id) => {
      return {
        tag_id: tag.id,
        product_id,
      };
    });
    res.json(await ProductTag.bulkCreate(productTagIdArr));
  }
  //or else just return the created tag
  else {
    res.json(tag);
  }
  } catch (err) {
    res.status(500).json(err);
  }
    
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

    // get list of current product_ids
    const productTagIds = productTags.map(({ product_id }) => product_id);
    // create filtered list of new product_ids
    const newProductTags = req.body.productIds
      .filter((product_id) => !productTagIds.includes(product_id))
      .map((product_id) => {
        return {
          tag_id: req.params.id,
          product_id,
        };
      });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      res.json(await ProductTag.bulkCreate(newProductTags));
  } catch {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    await Tag.destroy({
      where: { id: req.params.id }
    });
    res.json("Tag deleted");
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
