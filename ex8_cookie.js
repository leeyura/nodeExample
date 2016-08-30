var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
// cookie parser 를 사용하고자 할때, middleware 필요
app.use(cookieParser('23879ASDF234sdf@!#$a'));

// example 1 counting
app.get('/cookie', function(req, res){
    var cnt;
    if(req.signedCookies.count){
        cnt = parseInt(req.signedCookies.count);    
    }else{
        cnt = 0;
    }
    cnt = cnt+1;
    res.cookie('count', cnt, {signed:true});
    res.send('count : ' + cnt);
});

// example 2 shopping cart

var products = {
    1:{title:'The history of web 1 '},
    2:{title:'The next web'}
};

app.get('/products', function(req, res){
    var title = '';
        //index  in list 
    for(var name in products){
        title += `
            <li>
                <a href="/cart/${name}">${products[name].title}</a>
            </li>`;
    }
    res.send(`<h1>Shopping Cart</h1><ul>${title}</ul><a href="/cart">Cart</a>`);
});
/*
cart = {"1":1, "2":2}
*/
app.get('/cart', function(req, res){
    var cart = req.signedCookies.cart;
    var result='';
    if(!cart){
        res.send('Empty your Cart');
    }else{
        
        for(var id in cart){
            result += `<li>${products[id].title}(${cart[id]})</li>`
        }
    }
    res.send(`<h1>Shopping Cart</h1>
              <ul>${result}</ul>
              <a href="/products">Products List</a>`);
});


app.get('/cart/:id', function(req, res){
  var id = req.params.id;
  var cart; 
    if(req.signedCookies.cart) {
        cart = req.signedCookies.cart;
   } else {
        cart = {};
   }
   if(!cart[id]){
        cart[id] = 0;
   }
   cart[id] = parseInt(cart[id])+1;
   res.cookie('cart', cart, {signed:true});
   res.send(cart);
 });

app.listen(3000, function(){
    console.log('cookie go!');
});

