# 🚀 GitHub Pages Deployment Instructions

## Quick Setup Commands

After creating your GitHub repository, run these commands:

```bash
# Navigate to your project
cd /mnt/c/projects/indie-game-hub

# Add your GitHub repository (replace YOUR_USERNAME with your actual username)
git remote add origin https://github.com/YOUR_USERNAME/indie-game-hub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select: **"GitHub Actions"**
5. Save the changes

## Automatic Deployment

✅ GitHub Actions workflow is already configured!
✅ Your site will automatically deploy when you push changes
✅ No manual deployment needed

## Your Live Site URL

After deployment (2-3 minutes), your site will be available at:
```
https://YOUR_USERNAME.github.io/indie-game-hub
```

## Future Updates

To update your site:
```bash
# Make your changes to the files
# Then commit and push:
git add .
git commit -m "Update website content"
git push
```

The site will automatically redeploy within minutes!

## Troubleshooting

- **404 Error**: Wait 5-10 minutes for initial deployment
- **Site not updating**: Check the Actions tab for deployment status
- **Permission issues**: Ensure repository is public and Pages is enabled

## Custom Domain (Optional)

To use your own domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS with your domain provider
3. Enable HTTPS in GitHub Pages settings