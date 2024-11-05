const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(1234);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/serviceworker.js");
 }
 self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });