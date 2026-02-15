# 应用图标设置指南 / App Icon Setup Guide

## 📱 如何设置应用图标 / How to Set App Icon

目前有两种方式设置应用图标：

### 方式 1：使用默认图标（推荐新手）/ Method 1: Use Default Icon (Recommended for Beginners)

应用会使用项目内置的默认蓝色图标。无需任何配置。

The app will use the built-in default blue icon. No configuration needed.

**在 `app-config.json` 中保持 icon 为空：**
```json
{
  "appName": "My App",
  "packageId": "com.myapp.app",
  "appUrl": "https://mywebsite.com",
  "allowedDomains": ["mywebsite.com"],
  "icon": ""
}
```

### 方式 2：自定义图标（高级）/ Method 2: Custom Icon (Advanced)

如果需要自定义图标，需要直接修改 WebApkShell Android 项目中的图标资源文件。

To use a custom icon, you need to directly modify the icon resources in the WebApkShell Android project.

#### 步骤 / Steps:

1. **准备图标文件 / Prepare Icon Files**
   - 需要准备不同分辨率的图标（推荐使用在线工具如 [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)）
   - 建议准备以下尺寸：
     - mdpi: 48x48 px
     - hdpi: 72x72 px
     - xhdpi: 96x96 px
     - xxhdpi: 144x144 px
     - xxxhdpi: 192x192 px

2. **替换图标文件 / Replace Icon Files**
   
   将生成的图标文件复制到以下目录：
   ```
   WebApkShell/app/src/main/res/mipmap-mdpi/ic_launcher.webp
   WebApkShell/app/src/main/res/mipmap-hdpi/ic_launcher.webp
   WebApkShell/app/src/main/res/mipmap-xhdpi/ic_launcher.webp
   WebApkShell/app/src/main/res/mipmap-xxhdpi/ic_launcher.webp
   WebApkShell/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp
   ```

3. **修改 build.gradle**
   
   编辑 `WebApkShell/app/build.gradle`，找到以下行：
   ```gradle
   manifestPlaceholders = [
       appIcon  : "@drawable/" + getEnv("AP_ICON", "logo"),
       ...
   ]
   ```
   
   改为使用 mipmap：
   ```gradle
   manifestPlaceholders = [
       appIcon  : "@mipmap/ic_launcher",
       ...
   ]
   ```

4. **重新构建应用 / Rebuild the App**
   ```bash
   bun run build:app
   ```

## 🎨 在线图标生成工具 / Online Icon Generator Tools

推荐使用以下工具生成 Android 图标：

- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) - 官方推荐
- [App Icon Generator](https://appicon.co/) - 多平台支持
- [MakeAppIcon](https://makeappicon.com/) - 简单易用

## ⚠️ 注意事项 / Important Notes

1. 图标文件应为正方形（1:1 比例）
2. 建议使用 PNG 或 WebP 格式
3. 图标应该简洁清晰，在小尺寸下也能识别
4. 避免使用过多细节或文字

Icon files should be square (1:1 ratio)  
Recommended formats: PNG or WebP  
Icons should be simple and clear, recognizable at small sizes  
Avoid too much detail or text

## 🔧 故障排除 / Troubleshooting

### 图标没有更新？/ Icon not updating?

1. 清理构建缓存：
   ```bash
   cd WebApkShell
   ./gradlew clean
   cd ..
   bun run build:app
   ```

2. 卸载旧版 APP，重新安装新构建的 APK

3. 确认图标文件路径正确

### 图标显示为空白？/ Icon showing blank?

1. 检查图标文件是否损坏
2. 确认文件格式正确（PNG 或 WebP）
3. 确认文件权限正确

---

**如有问题，请在 GitHub Issues 中提出 / For issues, please submit on GitHub Issues**
