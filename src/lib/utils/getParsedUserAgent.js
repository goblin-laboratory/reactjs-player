import UAParser from 'ua-parser-js';

let parser;
let parsed;

export default function getParsedUserAgent() {
  if (!parser) {
    parser = new UAParser();
  }

  if (!parsed) {
    parsed = parser.getResult();
  }
  return parsed;
}
