
const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query?.toLowerCase();
    if (!query) return { statusCode: 400, body: "Missing query" };

    const booksDir = path.join(__dirname, "../../books");
    const bookFiles = fs.readdirSync(booksDir);

    const results = {};
    for (const file of bookFiles) {
        const content = fs.readFileSync(path.join(booksDir, file), "utf8").toLowerCase();
        const words = content.split(/[^a-zA-Z]+/);
        const count = words.filter(word => word === query).length;
        results[file] = count;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};
