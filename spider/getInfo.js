const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class Spider {
  index = 1050;
  word = "";
  baseUrl = `https://voa-story.com/%e5%ad%a6%e4%b8%aa%e8%af%8d`;
  arr = [];

  constructor() {
    this.instance = axios.create({
      timeout: 1000 * 30,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      },
    });
  }

  async grabData(nameArr, i) {
    const { num, content } = nameArr[i];
    this.index = num;
    this.word = content;
    try {
      const res = await this.instance.get(`${this.baseUrl}-${this.index}`);
      const article = this.parseHtml(res.data);
      const item = {
        index: num,
        title: content,
        article: article,
      };
      this.saveIt(`spider/data/data.json`, item);
      console.log(`第${this.index}个单词${this.word}完成!`);
    } catch (error) {
      fs.writeFileSync(
        "spider/data/error.json",
        `第${this.index}个单词爬取失败\n`,
        { flag: "a+" }
      );
      console.log(`第${this.index}个单词${this.word}失败!`);
      await this.grabData(nameArr, this.index);
    }
  }
  parseHtml(html) {
    if (!html) {
      console.log("未获取到网页");
      return;
    }
    const $ = cheerio.load(html);
    const string = $("article.small>p").text();
    return string;
  }

  saveIt(url, data) {
    try {
      fs.writeFileSync(url, JSON.stringify(data) + ",", { flag: "a+" });
    } catch (error) {
      console.log("保存出错了" + error);
    }
  }
}



(async () => {
  const s = new Spider();
  const nameString = fs.readFileSync("spider/data/name.json").toString();
  const nameArr = JSON.parse(nameString);
  let i = nameArr.length - 1;
  while (i >= 0) {
    await s.grabData(nameArr, i)
    --i
  }
  console.log("全部完成");
})()
