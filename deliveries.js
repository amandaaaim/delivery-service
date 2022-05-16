const express = require("express");
const router = express();
const bodyPharser = require("body-parser");

router.use(bodyPharser.json());

const mongoose = require("mongoose");

require("./Delivery")
const Delivery = mongoose.model("Delivery")

mongoose.connect("mongodb+srv://sliit:sliit@aftest.xubi7.mongodb.net/delivery?retryWrites=true&w=majority", () =>{
    console.log("Database is connected");
});


router.post('/adddelivery', (req,res)=>{
    const order_id = req.body.order_id;
    const delivery_type = req.body.delivery_type;
    const agent = req.body.agent;
    const delivery_status = req.body.delivery_status;
    const tracking_number = req.body.tracking_number;
    const date = req.body.date;
    const destination = req.body.destination;
  
    var newDelivery = new Delivery({
        order_id,
        delivery_type,
        agent,
        delivery_status,
        tracking_number,
        date,
        destination
       
    });
  
    newDelivery
      .save()
      .then(() => {
        res.json("Delivery added successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  
});

router.get("/deliverylist", (req, res) => {
    Delivery.find()
      .then((Delivery) => {
        res.json(Delivery);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/get/:id", (req, res) => {
    let deliveryid = req.params.id; 
    Delivery.findById(deliveryid)
      .then((Delivery) => {
        res.json(Delivery);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.put("/updatedelivery/:id", (req, res) => {
    let id = req.params.id;
    const { 
      order_id,
      delivery_type,
      agent,
      delivery_status,
      tracking_number,
      date,
      destination
     } = req.body;
  
    const deliveryUpdate = {
      order_id,
      delivery_type,
      agent,
      delivery_status,
      tracking_number,
      date,
      destination
      
    };
  
    Delivery.findByIdAndUpdate(id, deliveryUpdate)
      .then(() => {
        res.status(200).send({ status: "Delivery is updated successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Update!" });
        console.log(err.message);
      });
  });

  router.delete("/deletedelivery/:id",(req, res) => {
    let id = req.params.id;
  
    Delivery.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ status: "Payment Deleted!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Delete!" });
        console.log(err.message);
      });
  } );

router.listen(5656, ()=>{
    console.log("Delivery service is running");
})