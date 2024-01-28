/* (c) aesthetical 2024 */

const { readFileSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");

const HTML_SOURCE = join(__dirname, "html.txt");
const STAFF_OUTPUT = join(__dirname, "output.txt");

if (!existsSync(HTML_SOURCE)) {
    console.log("err: go to https://blocksmc.com/players, press Ctrl + U, copy and paste the data into a file named html.txt.");
    return;
}

const content = readFileSync(HTML_SOURCE).toString();
if (!content || !content.length) {
    console.log("err: file cannot be empty");
    return;
}

const FAT_FUCKS = [];
{
    const splitContent = content.split("\n");
    for (let i = 0; i < splitContent.length; ++i) {
        const line = splitContent[i].trim();

        if (line.startsWith("<div class=\"player-card\">")) {
            const paragraphTag = splitContent[i + 2].trim();
            FAT_FUCKS.push(/>([A-Z0-9_-]+)</gi.exec(paragraphTag)[1]);
        } else if (line.startsWith("<div class=\"player-card-sm\"")) {
            FAT_FUCKS.push(/title=\"([A-Z0-9_-]+)\"/gi.exec(line)[1]);
        }
    }
}

writeFileSync(STAFF_OUTPUT, FAT_FUCKS.join(","));
console.log(`inf: wrote ${FAT_FUCKS.length} to ${STAFF_OUTPUT}`);