const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var exphbs = require("express-handlebars");
const mysql = require("mysql2/promise");
const config = require("./config");
const dialogflow = require("dialogflow");

// for parsing json
app.use(
    bodyParser.json({
        limit: "20mb",
    })
);
// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: "20mb",
    })
);

const dbConfig = {
    host: "sql847.main-hosting.eu",
    user: "u690797633_cmilagros",
    password: "?G8dyOjm1r",
    database: "u690797633_cmilagros",
};

// app.use("/api", require("./routes/api"));

app.get("/", function (req, res) {
    res.json({ respuesta: "Sistema funcionando" });
});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'dialogflow01-396920';
const location = 'us-central1';
const agentId = '96135b5b-6e2b-4aa9-b21d-50b2a341c548';
const query = 'hola';
const languageCode = 'es'

// Imports the Google Cloud Some API library
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */
const client = new SessionsClient();

async function detectIntentText() {
  const sessionId = Math.random().toString(36).substring(7);
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(
    `Current Page: ${response.queryResult.currentPage.displayName}`
  );
}

detectIntentText();

app.listen(3000);