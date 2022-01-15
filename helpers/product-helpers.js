const { resolve, reject } = require('promise');
var db=require('../config/connection')
var product=require('../config/collections');
const { PRODUCT_COLLECTION } = require('../config/collections');
const collections = require('../config/collections');

module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data.insertedId)
               
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}