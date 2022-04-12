"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadResolvers = void 0;
const graphql_upload_1 = require("graphql-upload");
const stream_1 = require("stream");
const fs = require('fs');
const path = require('path');
exports.fileUploadResolvers = {
    Upload: graphql_upload_1.graphqlUploadExpress,
    Mutation: {
        singleUpload: (_root, { file }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('file', file);
            try {
                if (!file) {
                    throw new Error(`No file ${file}`);
                }
                else {
                    // const inside = await file
                    const { createReadStream, filename, mimetype, encoding } = yield file.file;
                    const stream = createReadStream();
                    const pathName = path.join(__dirname, '..', '..', '..', `/public/images/${filename}`);
                    const ws = yield stream.pipe(fs.createWriteStream(pathName));
                    yield stream_1.finished(ws, (err) => {
                        if (err) {
                            console.error('Stream failed.', err);
                        }
                        else {
                            console.log('Stream is done reading.');
                        }
                    });
                    return { filename, mimetype, encoding, url: `http://localhost:9000/images/${filename}` };
                }
            }
            catch (e) {
                throw new Error(`Cannot upload file. See the error: ${e}`);
            }
        }),
    }
};
