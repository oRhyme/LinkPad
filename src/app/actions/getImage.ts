"use server"
import * as cheerio from "cheerio"


export const foo = async(url:string)=>{
    const html:any = await fetch(url).then((res)=>res.text())
    const $ = cheerio.load(html)
    
    const image = $('meta[property="og:image"]').attr("content");
    console.log(image)
    return image
}