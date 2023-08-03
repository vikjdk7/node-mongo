const Store = require("../models/stores");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("../helper/logger");
logger.level = "info";

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.getAllStores = (req, res) => {
  Store.find({})
    .then((result) => {
      logger.info(`fetching all stores ${result}`);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.getStoreById = (req, res) => {
  Store.findById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getStoreByName = async (req, res) => {
  const storeName = req.params.name;
  const areAllStores = req.query.allStores;
  const storeNamesLOwerCase = storeName.toLowerCase();
  logger.info(
    `------------------------------ store from params is ${req.params.name}`
  );

  if (areAllStores) {
    const stores = await Store.find({ name: new RegExp(storeNamesLOwerCase) });
    if (!stores) {
      logger.error(`Sorry!! no store with ${storeName} was found`);
      return res.status(404).json({ store: `Not found` });
    }
    res.status(200).json(stores);
  } else {
    const store = await Store.findOne({ name: storeNamesLOwerCase });
    if (!store) {
      logger.error(`Sorry!! no store with ${storeName} was found`);
      return res.status(404).json({ store: `Not found` });
    }
    res.status(200).json(store);
  }
};

exports.createStore =
  ("/store",
  (req, res) => {
    //const newStore = new Store(req.body);
    logger.info(typeof req.body.name);
    const storePayload = {
      ...req.body,
      name: req.body.name.toLowerCase(),
    };
    const newStore = new Store(storePayload);
    newStore
      .save()
      .then((store) => {
        res.status(201).json(store);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });

exports.updateStore =
  ("/stores/:id",
  (req, res) => {
    Store.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        res.status(200).json({ updatedStore: result });
      })
      .catch((err) => {
        res.status(500).json({ errormessage: err.message });
      });
  });

exports.deleteStore =
  ("/store/:id",
  (req, res) => {
    Store.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.status(204).json({ deleteditem: result });
      })
      .catch((err) => {
        res.status(500).json({ errormessage: err.message });
      });
  });

exports.deleteAllStores = (req, res) => {
  Store.deleteMany({})
    .then((result) => {
      res.status(204).json({ deleteditem: result });
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err.message });
    });
};

exports.getStoreByLocation = (req, res) => {
  const storeLocation = req.params.location;
  const storeLocationLowerCase = storeLocation.toLowerCase();
  Store.find({ location: storeLocationLowerCase })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err.message });
    });
};

exports.getStoreByLocationAndName = (req, res) => {
  const storeLocation = req.params.location;
  const storeName = req.params.name;
  const storeLocationLowerCase = storeLocation.toLowerCase();
  const storeNameLowerCase = storeName.toLowerCase();
  Store.find({
    location: storeLocationLowerCase,
    name: storeNameLowerCase,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err.message });
    });
};

exports.getStoreByLocationAndNameAndType = (req, res) => {
  const storeLocation = req.params.location;
  const storeName = req.params.name;
  const storeType = req.params.type;
  const storeLocationLowerCase = storeLocation.toLowerCase();
  const storeNameLowerCase = storeName.toLowerCase();
  const storeTypeLowerCase = storeType.toLowerCase();
  Store.find({
    location: storeLocationLowerCase,
    name: storeNameLowerCase,
    type: storeTypeLowerCase,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err.message });
    });
};

exports.getStoreByLocationAndType = (req, res) => {
  //   const storeLocation = req.params.location;
  //   const storeType = req.params.type;
  //   const storeLocationLowerCase = storeLocation.toLowerCase();
  //   const storeTypeLowerCase = storeType.toLowerCase();
  //   Store.find({
  //     location: storeLocationLowerCase,
  //     type: storeTypeLowerCase,
  //   })
  //     .then((result) => {
  //       res.status(200).json(result);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ errormessage: err.message });
  //     });
  // };

  // exports.getStoreByFilter = (req, res) => {
  //   const filter = {};

  //   if (req.query.name && req.query.location && req.query.type) {
  //     filter.name = req.query.name.toLowerCase();
  //     filter.location = req.query.location.toLowerCase();
  //     filter.type = req.query.type.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.location && req.query.type) {
  //     filter.location = req.query.location.toLowerCase();
  //     filter.type = req.query.type.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.type && req.query.name) {
  //     filter.type = req.query.type.toLowerCase();
  //     filter.name = req.query.name.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.name && req.query.location) {
  //     filter.name = req.query.name.toLowerCase();
  //     filter.location = req.query.location.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.name) {
  //     filter.name = req.query.name.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.location) {
  //     filter.location = req.query.location.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   }
  //   if (req.query.type) {
  //     filter.type = req.query.type.toLowerCase();
  //     Store.find(filter)
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ errormessage: err.message });
  //       });
  //   } else {
  //     res.status(400).json({ errormessage: "Please provide a name" });
  //   }
  // };

  exports.getStoreByFilter = (req, res) => {
    const filter = {};

    // Add each filter if present in the query
    if (req.query.name) {
      filter.name = req.query.name.toLowerCase();
    }
    if (req.query.location) {
      filter.location = req.query.location.toLowerCase();
    }
    if (req.query.type) {
      filter.type = req.query.type.toLowerCase();
    }

    // Check if at least one filter is present
    if (Object.keys(filter).length === 0) {
      return res
        .status(400)
        .json({ errormessage: "Please provide at least one filter" });
    }

    // Find stores with the constructed filter
    Store.find(filter)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ errormessage: err.message });
      });
  };
};
