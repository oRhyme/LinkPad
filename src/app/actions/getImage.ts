"use server"

import * as cheerio from "cheerio"
const html:any = await fetch("https://www.youtube.com").then((res)=>res.text)
const $ = cheerio.load(html)

const image = $('meta[property="og:image"]').attr("content");
console.log(image)