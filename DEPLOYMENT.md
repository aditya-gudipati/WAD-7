# Manzil - Deployment Guide

## Quick Start

### Option 1: Local Testing
1. Open `index.html` in your web browser
2. No server setup required!

### Option 2: Live Server (VSCode)
1. Install "Live Server" extension in VSCode
2. Right-click `index.html` → "Open with Live Server"
3. Opens at `http://localhost:5500`

---

## Deployment Platforms

### 1. **Netlify** (Recommended - Free Tier)

#### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub/Google
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the `manzil` folder
5. Done! Get a live URL instantly

**Cost**: Free tier includes:
- Up to 300 build minutes/month
- Custom domain
- SSL certificate
- Analytics

---

### 2. **Vercel** (Fast Deployment)

#### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/Google
3. Click "New Project"
4. Upload folder or connect GitHub
5. Click "Deploy"

**Cost**: Free tier available

---

### 3. **GitHub Pages** (Free & Easy)

#### Steps:
1. Create GitHub account
2. Create new repository named `manzil`
3. Upload all files to repository
4. Go to Settings → Pages
5. Select "main" branch as source
6. Your site: `https://username.github.io/manzil`

**Cost**: Free forever

**Steps in Detail**:
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/manzil.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings.

---

### 4. **AWS S3 + CloudFront** (Professional)

#### Steps:
1. Create S3 bucket named `manzil-app`
2. Enable "Static website hosting"
3. Upload all files
4. Configure CloudFront for CDN
5. Get URL: `https://d123456.cloudfront.net`

**Cost**: Pay-as-you-go (very cheap for static sites)

---

### 5. **Azure Static Web Apps** (Microsoft)

#### Steps:
1. Go to [Azure Portal](https://portal.azure.com)
2. Search "Static Web Apps"
3. Create new app
4. Connect GitHub repository
5. Select `/` as app location
6. Deploy automatically on push

**Cost**: Free tier available

---

### 6. **Docker Containerization** (Optional)

Create `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t manzil .
docker run -p 8080:80 manzil
```

Access at `http://localhost:8080`

---

## Environment Setup (For Development)

### Prerequisites:
- Any modern web browser
- Optional: Node.js (for local server)

### Local Development Server:

**Using Python 3**:
```bash
cd manzil
python -m http.server 8000
# Open http://localhost:8000
```

**Using Python 2**:
```bash
python -m SimpleHTTPServer 8000
# Open http://localhost:8000
```

**Using Node.js (http-server)**:
```bash
npm install -g http-server
http-server
# Open http://localhost:8080
```

---

## Project Structure for Deployment

```
manzil/
├── index.html              ← Entry point
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── navbar.css
│   ├── js/
│   │   └── app.js
│   └── images/
├── pages/                  ← Folder for future page components
├── README.md
├── config.json
└── .gitignore             ← Add for version control
```

### Create `.gitignore`:
```
node_modules/
*.log
.DS_Store
dist/
build/
```

---

## Performance Optimization

### Current Optimizations:
✅ Minimal external dependencies (only Font Awesome CDN)  
✅ CSS Grid and Flexbox (no heavy frameworks)  
✅ Vanilla JavaScript (no jQuery or similar)  
✅ Optimized animations (CSS-based)  

### Further Optimization:
1. Minify CSS and JS for production
2. Compress images (use WebP format)
3. Enable gzip compression on server
4. Use CSS/JS bundles
5. Implement lazy loading for images

---

## SSL Certificate (HTTPS)

### Automatic (Recommended):
- Netlify: Automatic with Let's Encrypt ✅
- Vercel: Automatic ✅
- GitHub Pages: Automatic ✅
- Azure: Automatic ✅

### Manual (AWS/Azure):
- Use AWS Certificate Manager or Azure Key Vault
- Free with most cloud providers

---

## Domain Configuration

### Point Custom Domain:

**Example**: `manzil.com`

1. **Netlify**:
   - Site settings → Domain management
   - Add custom domain
   - Update DNS records

2. **Vercel**:
   - Project settings → Domains
   - Add domain and DNS records

3. **GitHub Pages**:
   - Add `CNAME` file with domain
   - Update DNS provider

4. **AWS**:
   - Use Route 53 for DNS
   - Configure alias records

---

## Monitoring & Analytics

### Free Options:
1. **Google Analytics**:
   - Add tracking ID to `<head>`
   - Monitor user behavior

2. **Netlify Analytics**:
   - Built-in with Netlify
   - Basic stats included

3. **Vercel Analytics**:
   - Available with Vercel
   - Performance metrics

---

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: '.'
          netlify-token: ${{ secrets.NETLIFY_TOKEN }}
```

---

## Testing Before Deployment

### Browser Compatibility:
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Edge
- [x] Mobile browsers

### Responsive Testing:
- [x] Mobile (320px - 480px)
- [x] Tablet (481px - 768px)
- [x] Desktop (769px+)

### Performance Testing:
- Use [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Check loading time
- Verify accessibility score

---

## Troubleshooting

### Issue: Blank Page
**Solution**: Check browser console (F12) for JavaScript errors

### Issue: Styles Not Loading
**Solution**: Check file paths in HTML (relative vs absolute)

### Issue: Slow Loading
**Solution**: 
- Minify CSS/JS
- Compress images
- Enable caching

### Issue: Mobile Responsiveness
**Solution**: Test with DevTools mobile emulator (F12)

---

## Recommended Deployment

### For Best Experience:
🏆 **Netlify** or **Vercel**
- Free tier with custom domain
- Automatic deployments from GitHub
- Built-in CDN
- SSL certificate included
- Excellent documentation

---

## Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Verify all links work
- [ ] Check weather widget updates
- [ ] Test sign-up and login flows
- [ ] Verify form validation
- [ ] Test booking functionality
- [ ] Check subscription features
- [ ] Monitor analytics
- [ ] Set up custom domain (optional)
- [ ] Enable monitoring/alerts

---

## Support & Documentation

For deployment-specific questions:
- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com
- **AWS**: https://aws.amazon.com/getting-started
- **Azure**: https://docs.microsoft.com/en-us/azure

---

**Happy Deploying! 🚀**
