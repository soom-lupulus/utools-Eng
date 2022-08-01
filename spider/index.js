const axios = require("axios")
const cheerio = require('cheerio');
const fs = require("fs")

class Spider {
    index = 1
    baseUrl = "https://voa-story.com/category/%E5%AD%A6%E4%B8%AA%E8%AF%8D-learn-a-word/page/" +
        this.index
    html = ""
    async init() {
        const res = await axios.get(this.baseUrl)
        this.html = res.data
    }
    parseHtml() {
        const $ = cheerio.load(this.html);
        $(".mg-posts-sec-inner article h4 a").each(function (index, element) {
            console.log($(this).text());
            const text = $(this).text()
            const num = text.match(/[0-9]+/)[0]
            const content = text.match(/[a-z]+/i)
            const item = {
                num,
                content,
            }
            fs.writeFileSync("./data/names.json", JSON.stringify(item) + ",")
        })


    }
}

const s = new Spider()
s.init().then(() => {
    s.parseHtml()
})


