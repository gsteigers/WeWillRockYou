"use strict"

const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const moment = require("moment");
const fileType = require("file-type");
const sha1 = require("sha1");

exports.handler = function(event, context) {
    let request = event.body;
    let base64String = request.base64String;
    let buffer = new Buffer(base64String, "base64");
    let fileMime = fileType(buffer);
    
    if (fileMime === null) {
        return context.fail("The string suppplied is not a file type");
    }
    
    let file = getFile(fileMime, buffer);
    let params = file.params;
    
    s3.putObject(params, function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        return console.log("File URL", file.full_path);
    })
}

let getFile = function(fileMime, buffer) {
    let fileExt = fileMime.ext;
    let hash = sha1(new Buffer(new Date().toString()));
    let now = moment().format("YYY-MM-DD HH:mm:ss");
    
    let filePath = hash + "/";
    let fileName = "fileName" + "." + fileExt;
    let fileFullName = filePath + fileName;
    let fileFullPath = "bucket name" + fileFullName;
    
    let params = {
    Bucket: "name of bucket",
    Key: fileFullName,
    Body: buffer
    };
    
    let uploadFile = {
        size: buffer.toString("ascii").length,
        type: fileMime.mime,
        name: fileName,
        full_path: fileFullPath
    };
    
    return {
        "params": params,
        "uploadFile": uploadFile
    };
}