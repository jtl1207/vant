# 📱 WebView App Builder / WebView 应用构建器

> Package any website as an Android app in 3 simple steps  
> 将任何网站打包成 Android 应用，只需 3 个简单步骤

---

## 🚀 Quick Start / 快速开始

### Step 1: Fork and Clone / 第一步：分支并克隆

```bash
# Fork this repository on GitHub
# 在 GitHub 上 Fork 这个仓库

# Clone your fork
# 克隆你的 fork
git clone https://github.com/YOUR_USERNAME/vant.git
cd vant
```

### Step 2: Configure Your App / 第二步：配置你的应用

Edit `app-config.json`:  
编辑 `app-config.json` 文件：

```json
{
  "appName": "Your App Name",           // 应用名称
  "packageId": "com.yourcompany.app",   // 包名（需唯一）
  "appUrl": "https://yourwebsite.com",  // 你的网站 URL
  "allowedDomains": ["yourwebsite.com"], // 允许访问的域名
  "versionName": "",                     // 版本号（可选，留空自动生成）
  "icon": ""                             // 图标路径（可选）
}
```

**Configuration Examples / 配置示例：**

```json
// Example 1: Blog / 示例 1：博客
{
  "appName": "My Blog",
  "packageId": "com.myblog.app",
  "appUrl": "https://myblog.com",
  "allowedDomains": ["myblog.com"]
}

// Example 2: Video Site / 示例 2：视频站点
{
  "appName": "Hanime",
  "packageId": "com.hanime1.app",
  "appUrl": "https://hanime1.me",
  "allowedDomains": ["hanime1.me"]
}

// Example 3: Multi-domain / 示例 3：多域名
{
  "appName": "My Site",
  "packageId": "com.mysite.app",
  "appUrl": "https://www.mysite.com",
  "allowedDomains": ["mysite.com", "api.mysite.com", "cdn.mysite.com"]
}
```

### Step 3: Build APK / 第三步：构建 APK

```bash
# Install dependencies / 安装依赖
bun install

# Build the app / 构建应用
bun run build:app

# Get your APK / 获取你的 APK
# Output: WebApkShell/app/build/outputs/apk/release/app_*.apk
```

---

## 📋 Configuration Fields / 配置字段说明

| Field / 字段 | Description / 说明 | Required / 必填 |
|--------------|-------------------|----------------|
| `appName` | App name shown on device / 设备上显示的应用名称 | ✅ Yes / 是 |
| `packageId` | Unique package identifier (reverse domain) / 唯一包标识符（反向域名） | ✅ Yes / 是 |
| `appUrl` | Website URL to load / 要加载的网站 URL | ✅ Yes / 是 |
| `allowedDomains` | Domains allowed for navigation (blocks ads) / 允许导航的域名（拦截广告） | ✅ Yes / 是 |
| `versionName` | App version (auto-generated if empty) / 应用版本（留空自动生成） | ❌ No / 否 |
| `icon` | Custom app icon path / 自定义应用图标路径 | ❌ No / 否 |

**Important Notes / 重要说明：**

- **packageId**: Must be unique globally, format: `com.company.appname`  
  **包名**: 必须全局唯一，格式：`com.公司名.应用名`

- **allowedDomains**: Only these domains can be navigated. Subdomains are automatically included.  
  **允许的域名**: 只有这些域名可以导航。子域名自动包含。
  
  Example / 例如: `"hanime1.me"` allows / 允许:
  - `hanime1.me`
  - `www.hanime1.me`
  - `*.hanime1.me`
  
  But blocks / 但拦截:
  - `evil.com`
  - `ads.network.com`
  - All other domains / 所有其他域名

---

## 🔒 Security Features / 安全特性

- ✅ **Link Blocking** / **链接拦截**: Automatically blocks external links (ads, redirects)  
  自动拦截外部链接（广告、重定向）

- ✅ **Domain Validation** / **域名验证**: Strict domain suffix matching  
  严格的域名后缀匹配

- ✅ **XSS Protection** / **XSS 防护**: Blocks `javascript:`, `data:` schemes  
  阻止 `javascript:`、`data:` 协议

- ✅ **Safe Navigation** / **安全导航**: Only allows configured domains  
  仅允许配置的域名

---

## 🛠️ Requirements / 系统要求

- [Bun](https://bun.sh) runtime  
- JDK 11 or higher / JDK 11 或更高版本
- Android SDK (auto-downloaded by Gradle) / Android SDK（Gradle 自动下载）

---

## 🤖 GitHub Actions (Optional) / GitHub Actions（可选）

This repository includes GitHub Actions for automatic APK building:  
本仓库包含 GitHub Actions 自动构建 APK：

1. Push to `main` branch / 推送到 `main` 分支
2. APK automatically built / APK 自动构建
3. Release created with APK / 创建包含 APK 的 Release

See `.github/workflows/android.yml` for details.  
详见 `.github/workflows/android.yml`

---

## ❓ FAQ / 常见问题

### How to change app name? / 如何更改应用名称？
Edit `appName` in `app-config.json` and rebuild.  
编辑 `app-config.json` 中的 `appName` 并重新构建。

### How to add multiple domains? / 如何添加多个域名？
Add to `allowedDomains` array:  
添加到 `allowedDomains` 数组：
```json
"allowedDomains": ["example.com", "api.example.com", "cdn.example.com"]
```

### Do I need to add subdomains separately? / 需要单独添加子域名吗？
No. Adding `example.com` automatically allows all `*.example.com` subdomains.  
不需要。添加 `example.com` 会自动允许所有 `*.example.com` 子域名。

### Build failed, what should I check? / 构建失败，应该检查什么？
1. Check `app-config.json` format is valid JSON  
   检查 `app-config.json` 格式是否为有效的 JSON
2. Ensure `packageId` is unique and properly formatted  
   确保 `packageId` 唯一且格式正确
3. Check Bun and JDK are installed  
   检查 Bun 和 JDK 是否已安装
4. See build logs for specific errors  
   查看构建日志了解具体错误

### App shows white screen / 应用显示白屏？
See [FAQ.md](FAQ.md) for detailed troubleshooting steps.  
查看 [FAQ.md](FAQ.md) 了解详细的故障排除步骤。

### How to set custom icon? / 如何设置自定义图标？
See [ICON_SETUP.md](ICON_SETUP.md) for detailed icon setup guide.  
查看 [ICON_SETUP.md](ICON_SETUP.md) 了解详细的图标设置指南。

**For more questions, see [FAQ.md](FAQ.md) / 更多问题请查看 [FAQ.md](FAQ.md)**

---

## 📂 Project Structure / 项目结构

```
.
├── app-config.json              # Your app configuration / 应用配置
├── build-app.ts                 # Build script (don't modify) / 构建脚本（无需修改）
├── webapkshell-template.patch   # Template (don't modify) / 模板（无需修改）
├── package.json                 # Dependencies / 依赖
├── .github/workflows/           # CI/CD automation / 自动化构建
└── WebApkShell/                 # Android project (auto-generated) / Android 项目（自动生成）
```

---

## 📄 License / 许可证

MIT License

---

## 🤝 Contributing / 贡献

Issues and Pull Requests are welcome!  
欢迎提交 Issue 和 Pull Request！

---

**🎉 Build your app in 5 minutes! / 5 分钟构建你的应用！**
