# 配置文件说明 / Configuration Guide

## app-config.json 字段说明

### 必填字段

#### appName (应用名称)
显示在手机桌面的应用名称

**示例:**
- ✅ "豆瓣电影"
- ✅ "My Blog"
- ✅ "购物助手"

#### packageId (包名)
Android 应用的唯一标识符，必须全球唯一

**格式:** `com.公司/组织.应用名`

**示例:**
- ✅ "com.douban.movie"
- ✅ "com.mycompany.blog"
- ✅ "com.github.username.app"

**注意:** 
- 只能包含小写字母、数字和点
- 至少包含两个部分（用点分隔）
- 建议使用你控制的域名倒序

#### appUrl (启动 URL)
应用启动时加载的网址

**示例:**
- ✅ "https://movie.douban.com"
- ✅ "https://www.example.com"
- ✅ "https://myblog.github.io"

**注意:**
- 必须是完整的 URL（包含 https:// 或 http://）
- 建议使用 HTTPS

#### allowedDomains (允许的域名列表)
允许在应用内导航的域名，其他域名会被拦截

**示例:**
```json
["douban.com"]                    // 只允许 douban.com
["example.com", "api.example.com"] // 允许多个域名
["github.io", "githubusercontent.com"] // GitHub Pages
```

**自动包含子域名:**
- 配置 `"douban.com"` 会自动允许：
  - `douban.com`
  - `movie.douban.com`
  - `book.douban.com`
  - 等所有子域名

### 可选字段

#### versionName (版本号)
应用版本号，留空会自动生成

**示例:**
- "1.0.0"
- "2.1.3"
- "" (留空自动生成)

#### icon (图标路径)
应用图标文件路径，留空使用默认图标

**示例:**
- "" (使用默认图标)
- "/path/to/icon.xml"

---

## 完整示例

### 示例 1: 博客应用
```json
{
  "appName": "我的博客",
  "packageId": "com.myblog.app",
  "appUrl": "https://myblog.com",
  "allowedDomains": ["myblog.com"],
  "versionName": "1.0.0",
  "icon": ""
}
```

### 示例 2: 多域名应用
```json
{
  "appName": "在线商城",
  "packageId": "com.myshop.app",
  "appUrl": "https://www.myshop.com",
  "allowedDomains": [
    "myshop.com",
    "api.myshop.com",
    "cdn.myshop.com",
    "pay.myshop.com"
  ],
  "versionName": "",
  "icon": ""
}
```

### 示例 3: GitHub Pages
```json
{
  "appName": "My Portfolio",
  "packageId": "com.github.username.portfolio",
  "appUrl": "https://username.github.io",
  "allowedDomains": ["github.io", "githubusercontent.com"],
  "versionName": "",
  "icon": ""
}
```

---

## 常见问题

### Q: 包名（packageId）怎么起？
A: 使用你的域名倒序 + 应用名称。例如：
- 域名 `example.com` → `com.example.appname`
- GitHub `github.com/username` → `com.github.username.appname`

### Q: 是否可以允许所有域名？
A: 不建议。链接拦截是为了防止广告和恶意跳转。只添加你需要的域名。

### Q: 子域名需要单独添加吗？
A: 不需要。添加 `example.com` 会自动包含所有子域名如 `www.example.com`、`api.example.com` 等。

### Q: 如何测试配置是否正确？
A: 运行 `bun run build:app`，如果没有错误，配置就是正确的。

---

更多信息请查看 [WEBVIEW_APP_README.md](./WEBVIEW_APP_README.md)
