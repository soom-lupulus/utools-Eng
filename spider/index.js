const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

class Spider {
  index = 362;
  lastIndex = 363;
  baseUrl =
    "https://voa-story.com/category/%E5%AD%A6%E4%B8%AA%E8%AF%8D-learn-a-word/page/";
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

  async start() {
    try {
      while (this.index < this.lastIndex) {
        const res = await this.instance.get(this.baseUrl + this.index);
        this.parseHtml(res.data);
        console.log(`第${this.index}页完成`);
        this.index++;
      }
      this.saveIt(`spider/data/1.json`, this.arr);
    } catch (error) {
      fs.writeFileSync(
        "spider/data/error.json",
        `第${this.index}页爬取失败\n`,
        { flag: "a+" }
      );
      // 错误重试
      this.start()
    }
  }
  parseHtml(html) {
    if (!html) return;
    const $ = cheerio.load(html);
    const self = this;
    $(".mg-posts-sec-inner article h4 a").each(function (index, element) {
      //   console.log($(this).text());
      const text = $(this).text();
      const num = text.match(/[0-9]+/)[0];
      const content = text
        .match(/[a-z\s’-]+/gi)
        .join("")
        .trim();
      const item = {
        num,
        content,
      };
      self.arr.push(item);
    });
  }

  saveIt(url, data) {
    try {
      fs.writeFileSync(url, JSON.stringify(data), { flag: "a+" });
    } catch (error) {
      console.log("保存出错了" + error);
    }
  }
}

const s = new Spider();
s.start();

// const start = () => {
//   s.grabData().then((html) => {
//     s.parseHtml(html);
//     console.log("第" + s.index + "页完成");
//     if (s.index < s.lastIndex) {
//       s.index++;
//       start();
//     } else {
//       s.saveIt(`spider/data/names${s.index}.json`, s.arr);
//       console.log("Ok");
//     }
//   });
// };

// start();
