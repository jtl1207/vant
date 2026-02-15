# Hanime1.me Android App 配置说明

本文档说明如何配置和构建 hanime1.me 的 Android 应用。

## 功能特性

1. **网站打包**: 将 hanime1.me 打包为 Android 应用
2. **链接拦截**: 自动拦截所有外部链接，只允许 hanime1.me 域名内的导航（防止广告）
3. **应用名称**: "热爱的"

## 配置步骤

### 1. 主仓库配置

已在 `package.json` 中配置:
```json
"webApkShell": {
  "build_script": "",
  "dist_path": "./packages/vant/site-dist",
  "AP_ID": "com.hanime1.app",
  "AP_NAME": "热爱的",
  "AP_VERSION_NAME": ""
}
```

### 2. WebApkShell 子模块修改

需要将以下补丁应用到 WebApkShell 子模块:

```bash
cd WebApkShell
git apply ../webapkshell-changes.patch
```

或手动修改 `WebApkShell/app/src/main/java/com/qcp/androidshell/MainActivity.kt`:

#### 添加导入:
```kotlin
import android.webkit.WebResourceRequest
import android.widget.Toast
```

#### 在 WebViewClient 中添加链接拦截逻辑:
```kotlin
override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
    request?.let {
        val url = it.url.toString()
        val host = it.url.host ?: ""
        
        // Allow navigation only within hanime1.me domain
        if (host.contains("hanime1.me") || host.isEmpty()) {
            // Allow the URL to load
            return false
        } else {
            // Block external links (prevent ads)
            Toast.makeText(
                this@MainActivity,
                "已拦截外部链接: $host",
                Toast.LENGTH_SHORT
            ).show()
            return true
        }
    }
    return super.shouldOverrideUrlLoading(view, request)
}
```

#### 修改加载的 URL:
```kotlin
// 改为直接加载 hanime1.me
webView.loadUrl("https://hanime1.me")
// webView.loadUrl("file:///android_asset/index.html")  // 注释掉原来的本地加载
```

## 构建应用

1. 确保已安装所有依赖:
```bash
bun install
```

2. 初始化子模块并应用补丁:
```bash
git submodule update --init --recursive
cd WebApkShell
git apply ../webapkshell-changes.patch
cd ..
```

3. 创建最小化的 dist 目录（用于满足构建脚本要求）:
```bash
mkdir -p ./packages/vant/site-dist
echo '<!DOCTYPE html><html><body>Loading...</body></html>' > ./packages/vant/site-dist/index.html
```

4. 运行构建:
```bash
bun genApk.ts
```

或使用 GitHub Actions（已配置在 `.github/workflows/android.yml`）

## 链接拦截功能说明

应用会自动拦截所有不属于 `hanime1.me` 域名的链接:
- ✅ 允许: `https://hanime1.me/*`
- ✅ 允许: `https://www.hanime1.me/*`
- ✅ 允许: `https://subdomain.hanime1.me/*`
- ❌ 拦截: 所有其他域名（广告、跳转等）

当用户点击外部链接时，会显示 Toast 提示："已拦截外部链接: [域名]"

## 输出文件

构建成功后，APK 文件位于:
```
WebApkShell/app/build/outputs/apk/release/app_[版本号].apk
```

## 权限说明

应用需要以下权限（已在 AndroidManifest.xml 中配置）:
- `INTERNET`: 访问网络
- `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`: 后台运行优化
- `FOREGROUND_SERVICE`: 前台服务

## 注意事项

1. 该应用直接从互联网加载 hanime1.me，需要网络连接
2. 链接拦截功能会阻止所有外部导航，包括可能的合法跳转
3. 如需调整允许的域名，请修改 MainActivity.kt 中的域名检查逻辑
