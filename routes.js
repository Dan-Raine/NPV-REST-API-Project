var math = require('mathjs');

var appRouter = function(app){
    
    app.get("/", function(req, res){
        res.send("hello world");
    });
    
    app.get("/account", function(req, res){
        var accountMock = {
            "username": "kulsuri",
            "password": "qwerty",
            "twitter": "kulsuri"
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
        var cashFlow1 = req.body.cashFlow1;
        if(!discountRate || !initialInvestment || !years || !cashFlow1) {
            return res.send({"status": "error", "message": "missing a parameter"});
        } else {
            var discountRateDecimal = math.divide(discountRate, 100);
            var cashFlows = [];
            
            for (i=0; i < years; i++){
                var cashFlowYear = "cashFlow" + i;
                cashFlows[i] = req.body.cashFlow1;     
            };
//            var npv = math.add(-initialInvestment, cashFlow1/(1+discountRateDecimal));

            //return res.sendStatus(cashFlows);
            return res.send(cashFlows);
        }       
    });
};

module.exports = appRouter;