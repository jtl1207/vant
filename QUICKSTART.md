# 快速开始 / Quick Start

## 三步构建你的 Android 应用 / Build Your Android App in 3 Steps

### 1️⃣ 编辑配置 / Edit Config

编辑 `app-config.json`:

```json
{
  "appName": "我的应用",
  "packageId": "com.mycompany.myapp",
  "appUrl": "https://mywebsite.com",
  "allowedDomains": ["mywebsite.com"]
}
```

💡 **配置说明:** 查看 [CONFIG_GUIDE.md](./CONFIG_GUIDE.md) 了解每个字段的详细说明

💡 **示例配置:** 查看 [app-config.example.json](./app-config.example.json)

### 2️⃣ 运行构建 / Run Build

```bash
bun run build:app
```

### 3️⃣ 获取 APK / Get APK

```
WebApkShell/app/build/outputs/apk/release/app_*.apk
```

## 就这么简单！/ That's it!

---

📖 **完整文档:** [WEBVIEW_APP_README.md](./WEBVIEW_APP_README.md)

🔧 **配置指南:** [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)

⚙️ **示例配置:** [app-config.example.json](./app-config.example.json)
