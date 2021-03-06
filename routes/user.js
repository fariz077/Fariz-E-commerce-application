const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')
/* GET home page. */

router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user)
    productHelpers.getAllProducts().then((products)=>{
        
     res.render('user/view-products',{admin:false,products,user})
   });
  });
  
  router.get('/login',function (req,res) {
    if (req.session.loggedIn) {
      res.redirect('/')
    }else{
      res.render('user/login')      
    }
    
  })

  router.get('/signup',function (req,res) {
     res.render('user/signup')      
  })

  router.post('/signup',function (req,res) {
           userHelpers.doSignup(req.body).then((response)=>{
            console.log(response);
            
          
           })

  })

  router.post('/login',function (req,res) {
    userHelpers.doLogin(req.body).then((response)=>{
      if (response.status) {
        req.session.loggedIn=true
        req.session.user=response.user
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    })
  })

  router.get('/logout',function (req,res) {
    req.session.destroy()
    res.redirect('/')    
  })

module.exports = router;
