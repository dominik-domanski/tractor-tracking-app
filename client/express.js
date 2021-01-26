const express = require('express');
const app = express();

const PORT = 8080;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

app.listen(PORT, () => {
  console.log(`Express web server started: http://localhost:${PORT}`);
  console.log(`Serving content from /${sourceDir}/`);
});
