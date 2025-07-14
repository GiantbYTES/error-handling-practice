// initialize the server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');
