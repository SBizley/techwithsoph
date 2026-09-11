# Tech with Soph

Plain-English AI help for beginners. Static site, no build step, no framework, deploys as-is.

## What's in here so far

- `index.html`, home page
- `tools.html`, which AI tool to use for what, plus pricing
- `css/style.css`, shared styles (the Voltage/Playground brand blend)
- `netlify.toml`, basic Netlify config
- Still to come: `use-cases.html`, `glossary.html`, `risks.html`

## Getting this live: step by step

### 1. Create the GitHub repo

Go to github.com, click New repository, name it `techwithsoph` (or whatever you'd like the repo itself called, it doesn't have to match the domain), keep it public or private, your call, don't initialise it with a README (you already have one).

Then from a terminal, inside this folder:

```
git init
git add .
git commit -m "First version of the site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/techwithsoph.git
git push -u origin main
```

### 2. Connect it to Netlify

Go to app.netlify.com, sign in (GitHub login is easiest), click Add new site > Import an existing project, pick GitHub, authorise it, select this repo. Build settings: leave the build command blank, set the publish directory to `.` (this is already set in `netlify.toml`, so it should pick this up automatically). Click Deploy. You'll get a live `something-random.netlify.app` URL within a minute or two.

### 3. Point techwithsoph.com at it

Buy the domain first if you haven't (Cloudflare's registrar is a good option, no renewal price tricks). Then in Netlify: Site settings > Domain management > Add a custom domain, enter `techwithsoph.com`, follow Netlify's instructions to update your domain's DNS (it'll usually ask you to add either an A record or point your nameservers at Netlify, both are shown clearly in their dashboard). This can take anywhere from a few minutes to a few hours to fully propagate. Netlify issues a free SSL certificate automatically once the domain's verified, so `https://` will just work.

### 4. Check the form actually works

Once it's live on Netlify (the `.netlify.app` URL is enough to test, you don't need the custom domain live yet), submit the "what do you want to learn" form yourself once as a test. Go to your Netlify dashboard > Forms, you should see the submission appear there within a few seconds. Netlify also lets you set up an email notification for new submissions under Forms > Settings, worth turning on so you actually see these without having to check the dashboard.

## Making changes later

Any time you want to edit copy or add a page: edit the files, then:

```
git add .
git commit -m "describe what you changed"
git push
```

Netlify rebuilds and redeploys automatically within about a minute of every push, no extra step needed.
