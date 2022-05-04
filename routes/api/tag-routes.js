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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
