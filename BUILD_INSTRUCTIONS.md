# 构建说明 - Hanime1.me Android 应用

## 快速开始

### 使用 GitHub Actions 自动构建（推荐）

1. **推送代码**到 `main` 分支即可触发自动构建
2. 等待 GitHub Actions 完成构建（约5-10分钟）
3. 在仓库的 **Releases** 页面下载生成的 APK 文件

APK 文件名格式：`app_[日期时间].apk`  
例如：`app_20260215T093045.apk`

### 本地构建

如果需要在本地构建，请按以下步骤操作：

```bash
# 1. 克隆仓库
git clone https://github.com/jtl1207/vant.git
cd vant

# 2. 安装 Bun（如果尚未安装）
curl -fsSL https://bun.sh/install | bash

# 3. 安装依赖
bun install

# 4. 初始化并配置子模块
git submodule update --init --recursive
cd WebApkShell
git apply ../webapkshell-changes.patch
cd ..

# 5. 创建占位目录（genApk.ts 需要）
mkdir -p ./packages/vant/site-dist
echo '<!DOCTYPE html><html><body>Loading...</body></html>' > ./packages/vant/site-dist/index.html

# 6. 构建 APK
bun genApk.ts
```

构建完成后，APK 文件位于：
```
WebApkShell/app/build/outputs/apk/release/app_[版本号].apk
```

## 应用功能

### ✅ 已实现的功能

1. **直接加载 hanime1.me**
   - 应用启动时直接加载 `https://hanime1.me`
   - 无需预先打包网站内容
   - 始终显示最新版本的网站

2. **安全的链接拦截**（防广告）
   - ✅ 允许：`hanime1.me` 及所有子域名
   - ✅ 允许：`about:blank`（安全的空白页）
   - ❌ 拦截：所有外部域名（广告、跳转等）
   - ❌ 拦截：不安全的协议（`javascript:`、`data:`等）
   - 📱 拦截时显示提示："已拦截外部链接: [域名]"

3. **应用信息**
   - 应用名称：**热爱的**
   - 包名：`com.hanime1.app`
   - 图标：默认图标（可自定义）

4. **其他功能**
   - 支持后退按钮（WebView 历史记录）
   - 按主页键可最小化到后台
   - 启用 JavaScript（网站功能需要）
   - 启用本地存储（保存用户设置）
   - 支持混合内容（HTTP + HTTPS）

## 技术细节

### 链接拦截机制

使用 `WebViewClient.shouldOverrideUrlLoading` 实现严格的域名验证：

```kotlin
override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
    request?.let {
        val url = it.url.toString()
        val host = it.url.host ?: ""
        
        // 1. 允许安全的内部页面
        if (url.startsWith("about:blank")) {
            return false
        }
        
        // 2. 严格的域名验证
        if (host == "hanime1.me" || host.endsWith(".hanime1.me")) {
            return false  // 允许加载
        } else {
            // 3. 拦截并提示
            Toast.makeText(this@MainActivity, "已拦截外部链接: $host", Toast.LENGTH_SHORT).show()
            return true  // 拦截
        }
    }
    return super.shouldOverrideUrlLoading(view, request)
}
```

**为什么这样实现？**

1. **精确匹配**：`host == "hanime1.me"` 匹配主域名
2. **子域名匹配**：`host.endsWith(".hanime1.me")` 匹配所有子域名
3. **阻止绕过**：不使用 `contains()`，防止 `evil-hanime1.me.attacker.com` 等恶意域名
4. **安全协议**：只允许 `about:blank`，阻止 `javascript:`、`data:` 等 XSS 攻击

### 权限说明

应用需要的权限（已在 AndroidManifest.xml 中配置）：

- `INTERNET`：访问网络（加载 hanime1.me）
- `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`：后台运行优化
- `FOREGROUND_SERVICE`：前台服务（保持应用活跃）

### 安全性保障

✅ **已防护的攻击向量**：
- 恶意域名伪装（如 `evil-hanime1.me.com`）
- XSS 攻击（通过 `javascript:` URL）
- 数据注入（通过 `data:` URL）
- 广告跳转和重定向

## 自定义配置

### 修改应用名称

编辑 `package.json`：
```json
"webApkShell": {
  "AP_NAME": "你的应用名称"
}
```

### 修改包名

编辑 `package.json`：
```json
"webApkShell": {
  "AP_ID": "com.your.package"
}
```

### 添加更多允许的域名

如需允许其他域名，修改 `WebApkShell/app/src/main/java/com/qcp/androidshell/MainActivity.kt`：

```kotlin
if (host == "hanime1.me" || host.endsWith(".hanime1.me") ||
    host == "example.com" || host.endsWith(".example.com")) {
    return false  // 允许这些域名
}
```

⚠️ **注意**：始终使用严格匹配（`==` 或 `endsWith()`），不要使用 `contains()`！

### 自定义应用图标

1. 准备一个 XML 格式的图标文件
2. 将路径配置到 `package.json`：
```json
"webApkShell": {
  "AP_ICON": "/path/to/your/logo.xml"
}
```

## 常见问题

### Q: APK 构建失败怎么办？

**A**: 检查以下几点：
1. 确保已安装 JDK 11
2. 确保已安装 Bun
3. 确保子模块已正确初始化
4. 查看 GitHub Actions 日志了解详细错误

### Q: 应用无法加载网站？

**A**: 检查：
1. 设备是否有网络连接
2. hanime1.me 网站是否可访问
3. 应用是否有网络权限

### Q: 链接拦截不生效？

**A**: 确保：
1. 已正确应用补丁文件
2. MainActivity.kt 中的代码与文档一致
3. 重新构建 APK

### Q: 如何查看被拦截的链接？

**A**: 
- 应用会显示 Toast 提示："已拦截外部链接: [域名]"
- 可以在 Android Studio 的 Logcat 中查看详细日志

## 文件说明

- `package.json` - 应用配置文件
- `webapkshell-changes.patch` - MainActivity 修改补丁
- `HANIME_APP_SETUP.md` - 详细设置指南
- `IMPLEMENTATION_SUMMARY.md` - 技术实现总结
- `BUILD_INSTRUCTIONS.md` - 本文件，构建说明
- `.github/workflows/android.yml` - GitHub Actions 配置

## 支持

如有问题，请查看：
1. `HANIME_APP_SETUP.md` - 详细设置步骤
2. `IMPLEMENTATION_SUMMARY.md` - 技术实现细节
3. GitHub Issues - 提交问题和建议

---

**祝您使用愉快！**
