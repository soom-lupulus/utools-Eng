const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class Spider {
  index = 1050;
  word = "";
  baseUrl =
    `https://voa-story.com/%e5%ad%a6%e4%b8%aa%e8%af%8d-${this.index}-${this.word}/`;
  arr = [];

  constructor() {
    this.instance = axios.create({
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      },
    });
  }

  async grabData() {
    try {
      const res = await this.instance.get(this.baseUrl);
      return res.data;
    } catch (error) {
        console.log(error);
        // fs.writeFileSync("spider/data/error.json", `第${this.index}页爬取失败\n`, { flag: 'a+' });
    }
  }
  parseHtml(html) {
    if(!html) return;
    const $ = cheerio.load(html);
    const string = $("article.small>p").text()
    console.log(string);
  }

  saveIt(url, data) {
    try {
      fs.writeFileSync(url, JSON.stringify(data));
    } catch (error) {
      console.log("保存出错了" + error);
    }
  }
}

const s = new Spider();

const start = () => {
  s.grabData().then((html) => {
    s.parseHtml(html);
  });
};

start()

