var math = require('mathjs');

var appRouter = function(app){
    
    app.get("/", function(req, res){
        res.send("hello world");
    });
    
    app.get("/account", function(req, res, next){
        var accountMock = {
            "username": "kulsuri",
            "password": "QwErTy123",
            "twitter": "theBestRestApiTwitterAccount"
        };
        if(!req.query.username){
            return res.send({"status": "error", "message": "missing username"});
        } else if(req.query.username != accountMock.username){
            return res.send({"status": "error", "message": "wrong username"});
        } else {
            return res.send(accountMock);
        }
    });
    
    app.post("/account", function(req, res) {
        if(!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({"status": "error", "message": "missing a parameter"});
        } else {
            return res.send(req.body);
        }
    });
    
    app.post("/npv", function(req, res){
        var discountRate = req.body.discountRate;
        var initialInvestment = req.body.initialInvestment;
        var years = req.body.years;
        var cashFlow = req.body.cashFlow;
        if(!discountRate || !initialInvestment || !years || !cashFlow) {
            return res.send({"status": "error", "message": "missing a parameter"});
        } else {
            var discountRateDecimal = math.divide(discountRate, 100);
            var presentValue = [];
            var presentValueTotal = 0;

            for (i=0; i < years; i++){
                var b = i+1
                presentValue[i] = cashFlow[i]/math.pow(1+discountRateDecimal, b);
                presentValueTotal = math.add(presentValueTotal, presentValue[i]);
            };

            var npv = math.add(-initialInvestment, presentValueTotal);
            return res.sendStatus(npv);
        }       
    });
};

module.exports = appRouter;