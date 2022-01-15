var db=require('../config/connection')
var product=require('../config/collections');
const { resolve, reject } = require('promise');
const bcrypt=require('bcrypt');
const collections = require('../config/collections');

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
                console.log(data)
            })
        })
    },doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false
            let response={}
            let user=await db.get().collection(collections.USER_COLLECTION).findOne({Email:userData.Email})
            if (user) {
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if (status) {
                        console.log('login success')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed')
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed')
                resolve({status:false})
            }
        })
    }
}