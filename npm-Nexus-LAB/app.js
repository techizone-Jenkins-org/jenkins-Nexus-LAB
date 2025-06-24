const express = require("express");
const path = require("path");
const cfenv = require("cfenv");
const os = require("os");

const app = express();
const appEnv = cfenv.getAppEnv();

app.set('port', process.env.PORT || 9990);

function getServerIp() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'IP not found';
}
// Serve static files from /images folder
app.use(express.static(path.join(__dirname, 'images')));

// Route: /sapsecops
app.get('/sapsecops', (req, res) => {
  const ip = getServerIp();
  res.send(`
    <h2><center><u>Node JS App</u></center></h2>
    <h2><center>Welcome to sapsecops Solutions</center></h2>
    <h2><center>Your Server IP Address:<span style="color:red; font-weight:bold;">${ip}</center></h2>

  `);
});
// Route: /docker
app.get('/docker', (req, res) => {
  res.type('html');
  res.send(`
    <h2><center><u>Node JS <span style="color:green; font-weight:bold;">Docker App</u></center></h2>
    <h2><center>Welcome sapsecops Solutions</h2>
    <h2><center>Server IP Address: <span style="color:red; font-weight:bold;">${ip}</center></h2>

  `);
});

// Route: /html
app.get('/html', (req, res) => {
  res.type('html');
  res.send(`<h2>Welcome</h2><h2>/html call</h2>`);
});

// Route: /jsonData
app.get('/jsonData', (req, res) => {
  res.json({
    name: 'sapsecops Solutions',
    technology: 'DevOps',
    contact: '9980923226',
    email: 'sapsecopssolutions@gmail.com'
  });
});

// Route: /queryparam?key=course&name=devops
app.get('/queryparam', (req, res) => {
  res.send(`${req.query.key}: ${req.query.name}`);
});

// Route: /status-code-404
app.get('/status-code-404', (req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Route: /status-code-500
app.get('/status-code-500', (req, res) => {
  res.status(500).send('Internal Server Error – custom message');
});

// Route: /redirect
app.get('/redirect', (req, res) => {
  res.redirect('http://sapsecops.com'); // optionally update the domain here
});

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Node JS app is running at http://localhost:${app.get('port')}/sapsecops`);
});
