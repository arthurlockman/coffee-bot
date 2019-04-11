import {APIGatewayEvent, Handler} from "aws-lambda";

const AWS = require('aws-sdk');
const S3 = new AWS.S3({region: process.env.SERVICE_AWS_REGION});

const bucket = 'coffee-status-bot-bucket';
const file = 'coffeestatus.json';

const BuildResponseMessage: any = (status: number, body: any) => {
    return {
        statusCode: status,
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'Cache-Control': 'no-cache'
        },
        isBase64Encoded: false
    };
};

// noinspection JSUnusedGlobalSymbols
const GetStatus: Handler = async () => {
    const s3params = {
        Bucket: bucket,
        Key: file,
    };
    return S3.getObject(s3params).promise().then(statusFile => {
        const statusObject = JSON.parse(statusFile.Body.toString());
        return BuildResponseMessage(200, statusObject);
    }).catch(() => BuildResponseMessage(200, false));
};

// noinspection JSUnusedGlobalSymbols
const UpdateStatus: Handler = async (event: APIGatewayEvent) => {
    if (!!event.body) {
        const newStatus = JSON.parse(event.body).status;
        const s3params = {
            Bucket: bucket,
            Key: file,
            Body: JSON.stringify(newStatus)
        };
        return S3.putObject(s3params).promise().then(() => {
            return BuildResponseMessage(200, newStatus);
        }).catch(err => BuildResponseMessage(500, err.message));
    } else {
        return BuildResponseMessage(400, 'You must specify a POST body.');
    }
};

// noinspection JSUnusedGlobalSymbols
export {GetStatus, UpdateStatus}
