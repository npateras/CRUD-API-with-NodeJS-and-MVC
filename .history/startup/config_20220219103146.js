const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const{PORT, HOST, HOST_URL} = process.env;

assert(PORT, "Port is required");