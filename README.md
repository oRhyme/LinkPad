## Linkboard
  Linkboard allows the user to categorize and order useful websites/videos/blogs.The user can create folders and create "pads" within those folders. These pads contain a 'title', 'description' and a clickable 'url'. If the website provides meta og:image tag, the provided image is displayed as an embedded link. Otherwise, the favicon of the website is displayed along with the url. 
  The Linkboard extension allows the user to save a pad to a folder of their choice without having to copy paste the url in the website

## How to start the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To use the website with the extension, use 
```bash
next dev --experimental-https
```
