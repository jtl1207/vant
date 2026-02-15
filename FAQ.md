# 常见问题解答 / Frequently Asked Questions (FAQ)

## 🔍 编译和运行问题 / Build and Runtime Issues

### 1. 编译完成的 APP 是白屏 / Compiled App Shows White Screen

**可能原因 / Possible Causes:**

#### A. 网络连接问题 / Network Connection Issue
- APP 无法连接到配置的网站 URL
- The app cannot connect to the configured website URL

**解决方法 / Solution:**
1. 确认手机已连接到互联网 / Ensure phone is connected to internet
2. 尝试在手机浏览器中打开配置的 URL / Try opening the configured URL in phone browser
3. 检查 URL 是否正确（包括 http:// 或 https://）/ Check if URL is correct (including http:// or https://)
4. 如果网站需要特殊网络环境（如 VPN），确保已连接 / If website requires special network (like VPN), ensure connected

#### B. 域名配置错误 / Domain Configuration Error
- `allowedDomains` 中没有包含必要的域名
- Required domains not included in `allowedDomains`

**解决方法 / Solution:**
检查 `app-config.json` 中的 `allowedDomains` 配置：
```json
{
  "appUrl": "https://example.com",
  "allowedDomains": ["example.com", "api.example.com", "cdn.example.com"]
}
```

确保包含：
- 主域名 / Main domain
- API 域名 / API domains
- CDN 域名 / CDN domains
- 其他必要的子域名 / Other necessary subdomains

#### C. HTTPS/SSL 证书问题 / HTTPS/SSL Certificate Issue
- 网站的 SSL 证书无效或过期
- Website's SSL certificate is invalid or expired

**解决方法 / Solution:**
1. 在浏览器中检查网站证书 / Check website certificate in browser
2. 如果是自签名证书，需要在 Android 项目中添加信任配置 / For self-signed certificates, need to add trust configuration in Android project

#### D. 网站加载缓慢 / Website Loads Slowly
- 网站响应慢导致加载超时
- Slow website response causing timeout

**解决方法 / Solution:**
- 现在 APP 会显示错误页面并提供重新加载按钮
- The app now shows an error page with a reload button
- 点击"重新加载"按钮重试 / Click "Reload" button to retry

### 2. APP 无法打开 / App Cannot Open

**可能原因 / Possible Causes:**

#### A. 构建失败 / Build Failed
**解决方法 / Solution:**
检查构建日志，查看具体错误信息：
```bash
bun run build:app
```

常见构建错误：
- JDK 未安装或版本不对 / JDK not installed or wrong version
- 缺少 Android SDK / Missing Android SDK
- `app-config.json` 格式错误 / Invalid `app-config.json` format

#### B. 签名问题 / Signing Issue
- APK 签名配置问题
- APK signing configuration issue

**解决方法 / Solution:**
确认 `WebApkShell/app/keystore/Untitled` 文件存在

#### C. Android 版本兼容性 / Android Version Compatibility
- 设备 Android 版本过低（需要 Android 10 或更高）
- Device Android version too low (requires Android 10 or higher)

**解决方法 / Solution:**
在 Android 10 (API 29) 或更高版本的设备上安装

### 3. 外部链接被拦截 / External Links Being Blocked

这是正常的安全功能。APP 会拦截所有不在 `allowedDomains` 列表中的链接。

This is a normal security feature. The app blocks all links not in the `allowedDomains` list.

**解决方法 / Solution:**
如果需要允许某个域名，将其添加到 `app-config.json` 的 `allowedDomains` 中：
```json
{
  "allowedDomains": ["example.com", "newdomain.com"]
}
```

然后重新构建 APP。

### 4. 如何查看 APP 日志 / How to View App Logs

使用 Android Debug Bridge (adb) 查看日志：

```bash
# 连接设备后 / After connecting device
adb logcat | grep "AndroidShell"
```

或使用 Android Studio 的 Logcat 工具。

## ⚙️ 配置问题 / Configuration Issues

### 1. packageId 格式错误 / Invalid packageId Format

**正确格式 / Correct Format:**
```json
{
  "packageId": "com.company.appname"
}
```

要求 / Requirements:
- 必须以小写字母开头 / Must start with lowercase letter
- 只能包含小写字母、数字和点 / Only lowercase letters, numbers, and dots
- 至少包含两个部分（用点分隔）/ At least two parts (separated by dots)
- 每部分不能以数字开头 / Each part cannot start with number

### 2. versionName 自动生成规则 / versionName Auto-generation Rules

如果 `versionName` 留空，会自动生成格式如：`20240115T123456`

- 前8位：日期 (YYYYMMDD)
- T：分隔符
- 后6位：时间 (HHMMSS，秒数经过特殊编码)

## 🔐 安全问题 / Security Issues

### 1. 为什么会拦截某些链接？/ Why Are Some Links Blocked?

这是安全特性，防止：
- 广告跳转 / Ad redirects
- 恶意链接 / Malicious links
- 未授权的外部域名 / Unauthorized external domains

只有在 `allowedDomains` 中配置的域名才能访问。

### 2. 如何允许所有链接？/ How to Allow All Links? (不推荐 / Not Recommended)

**不建议这样做**，因为会降低安全性。如果确实需要，可以在 `allowedDomains` 中添加所有可能的域名。

## 📦 构建问题 / Build Issues

### 1. Gradle 构建很慢 / Gradle Build is Slow

**解决方法 / Solutions:**
1. 使用 Gradle 守护进程 / Use Gradle daemon
2. 增加 JVM 内存：编辑 `WebApkShell/gradle.properties`：
   ```properties
   org.gradle.jvmargs=-Xmx4096m
   ```
3. 启用并行构建 / Enable parallel build:
   ```properties
   org.gradle.parallel=true
   ```

### 2. 找不到 JDK / JDK Not Found

**解决方法 / Solution:**
安装 JDK 11 或更高版本，并设置 JAVA_HOME 环境变量：

```bash
# macOS/Linux
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH

# Windows (PowerShell)
$env:JAVA_HOME = "C:\path\to\jdk"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
```

### 3. Android SDK 许可未接受 / Android SDK Licenses Not Accepted

**解决方法 / Solution:**
```bash
# 接受所有许可 / Accept all licenses
yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
```

## 🎯 功能问题 / Feature Issues

### 1. 如何启用调试模式？/ How to Enable Debug Mode?

WebView 调试已默认启用（`WebView.setWebContentsDebuggingEnabled(true)`）

使用 Chrome 调试：
1. 连接设备并打开 APP
2. 在 Chrome 浏览器打开 `chrome://inspect`
3. 找到你的 APP 并点击 "inspect"

### 2. 如何修改 User-Agent？/ How to Modify User-Agent?

编辑 `WebApkShell/app/src/main/java/com/qcp/androidshell/MainActivity.kt`：

```kotlin
val webSettings = webView.settings
webSettings.userAgentString = "Your Custom User Agent"
```

### 3. 如何添加自定义 JavaScript？/ How to Add Custom JavaScript?

在 `MainActivity.kt` 中，页面加载完成后执行：

```kotlin
override fun onPageFinished(view: WebView?, url: String?) {
    super.onPageFinished(view, url)
    view?.evaluateJavascript("""
        // Your custom JavaScript here
        console.log('Custom JS loaded');
    """, null)
}
```

## 📱 设备兼容性 / Device Compatibility

### 支持的 Android 版本 / Supported Android Versions
- **最低版本 / Minimum**: Android 10 (API 29)
- **目标版本 / Target**: Android 12 (API 32)
- **推荐版本 / Recommended**: Android 11 或更高

### 已知兼容性问题 / Known Compatibility Issues
- Android 9 及以下不支持 / Android 9 and below not supported
- 某些定制 Android 系统可能需要额外权限 / Some custom Android systems may require additional permissions

## 💡 最佳实践 / Best Practices

1. **测试 URL 可访问性** / Test URL Accessibility
   在构建前，确保在浏览器中能正常访问配置的 URL

2. **完整的域名列表** / Complete Domain List  
   在 `allowedDomains` 中包含所有必要的域名（主域、API、CDN 等）

3. **版本控制** / Version Control  
   每次重大更新时，手动设置 `versionName` 便于追踪

4. **测试设备** / Test Devices  
   在多个 Android 版本的设备上测试 APP

5. **日志监控** / Log Monitoring  
   使用 adb logcat 监控 APP 运行时问题

---

**仍有问题？/ Still Have Questions?**

请在 GitHub Issues 中提出，我们会及时回复。  
Please submit on GitHub Issues, we'll respond promptly.
