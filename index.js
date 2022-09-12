var aws = require('aws-sdk');
const core = require('@actions/core');
var path = require("path");
var fs = require('fs');

try {
    const accountid = core.getInput('accountid');
    const accesskeyid = core.getInput('accesskeyid');
    const secretaccesskey = core.getInput('secretaccesskey');
    const bucket = core.getInput('bucket');
    const source = core.getInput('source');
    const destination = core.getInput('destination');

    const uploadDir = function(s3Path, bucketName) {

        var s3 = new aws.S3({
                accessKeyId: accesskeyid,
                secretAccessKey: secretaccesskey,
                endpoint: accountid + ".r2.cloudflarestorage.com/" + bucket,
        });

        function walkSync(currentDirPath, callback) {
            fs.readdirSync(currentDirPath).forEach(function (name) {
                var filePath = path.join(currentDirPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    callback(filePath, stat);
                } else if (stat.isDirectory()) {
                    walkSync(filePath, callback);
                }
            });
        }

        walkSync(s3Path, function(filePath, stat) {
            let bucketPath = filePath.substring(s3Path.length+1);
            let params = {Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
            s3.putObject(params, function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
                }
            });
        });
    };
    
    uploadDir(source, bucket);
} catch (error) {
    core.setFailed(error.message);
}