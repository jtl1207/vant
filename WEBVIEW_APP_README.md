# WebView App Builder

将任何网站快速打包成 Android 应用 / Package any website as an Android app

## 🚀 快速开始 / Quick Start

### 1. 配置你的应用 / Configure Your App

编辑 `app-config.json` 文件：

```json
{
  "appName": "My App",              // 应用名称 / App name
  "packageId": "com.example.myapp", // 包名 / Package ID
  "appUrl": "https://example.com",  // 网站 URL / Website URL
  "allowedDomains": ["example.com"], // 允许的域名 / Allowed domains
  "versionName": "",                 // 版本号(可选) / Version (optional)
  "icon": ""                         // 图标(可选) / Icon (optional)
}
```

### 2. 构建应用 / Build the App

```bash
# 安装依赖 / Install dependencies
bun install

# 构建 APK / Build APK
bun run build-app.ts
```

### 3. 获取 APK

构建完成后，APK 文件位于：

```
WebApkShell/app/build/outputs/apk/release/app_[版本号].apk
```

## 📝 配置说明 / Configuration Guide

### appName (应用名称)
- 显示在手机上的应用名称
- 例如: "我的应用", "My App"

### packageId (包名)
- Android 应用的唯一标识符
- 格式: `com.公司名.应用名`
- 例如: `com.example.myapp`

### appUrl (应用 URL)
- 应用启动时加载的网址
- 必须是完整的 URL
- 例如: `https://www.example.com`

### allowedDomains (允许的域名)
- 允许在应用内导航的域名列表
- 其他域名的链接会被拦截（防止广告和跳转）
- 例如: `["example.com", "api.example.com"]`

### versionName (版本名称)
- 可选，留空会自动生成
- 格式: "1.0.0" 或自定义

### icon (图标)
- 可选，应用图标路径
- 留空使用默认图标

## 🔒 安全特性 / Security Features

### 链接拦截 / Link Blocking
- ✅ 只允许配置的域名
- ✅ 自动拦截广告和外部跳转
- ✅ 防止 XSS 攻击（阻止 `javascript:`, `data:` 协议）
- ✅ 支持子域名（如 `*.example.com`）

当用户点击外部链接时，会显示提示："已拦截外部链接: [域名]"

## 🛠️ 高级配置 / Advanced Configuration

### 使用 GitHub Actions 自动构建

此仓库已配置 GitHub Actions，推送到 `main` 分支会自动构建 APK。

查看 `.github/workflows/android.yml` 了解详情。

### 自定义 WebView 设置

如需更多自定义，编辑：
```
WebApkShell/app/src/main/java/com/qcp/androidshell/MainActivity.kt
```

## 📦 构建要求 / Requirements

- [Bun](https://bun.sh) - JavaScript runtime
- JDK 11 或更高版本
- Android SDK (通过 Gradle 自动下载)

## 🎯 使用示例 / Examples

### 示例 1: 打包一个博客
```json
{
  "appName": "我的博客",
  "packageId": "com.myblog.app",
  "appUrl": "https://myblog.com",
  "allowedDomains": ["myblog.com"]
}
```

### 示例 2: 打包一个带 API 的网站
```json
{
  "appName": "My Website",
  "packageId": "com.mysite.app",
  "appUrl": "https://www.mysite.com",
  "allowedDomains": ["mysite.com", "api.mysite.com", "cdn.mysite.com"]
}
```

## ❓ 常见问题 / FAQ

### Q: 如何更改应用名称？
A: 修改 `app-config.json` 中的 `appName`，然后重新运行 `bun run build-app.ts`

### Q: 应用无法加载网站？
A: 检查：
1. `appUrl` 是否正确
2. 设备是否有网络连接
3. 网站是否可访问

### Q: 链接被拦截了？
A: 将需要访问的域名添加到 `allowedDomains` 列表中

### Q: 如何自定义图标？
A: 准备一个 XML 图标文件，将路径填入 `icon` 字段

## 📄 许可证 / License

MIT License

## 🤝 贡献 / Contributing

欢迎提交 Issues 和 Pull Requests！

---

**一键配置，轻松打包！/ One config, easy build!** 🎉
