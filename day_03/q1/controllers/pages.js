
const path = require("path");
const public = path.join( __dirname, "../" ,process.env.PUBLIC_DIR);
////const reqParams = ;
module.exports.getPage = function(req,res){
console.log(req.params);
    res.status(parseInt(process.env.OK_STATUS_CODE)).sendFile(public + req.params.pageId + ".html");
}

module.exports.postJson = function(req, res){
    res.status(parseInt(process.env.OK_STATUS_CODE)).end(process.env.POST_JSON);
}