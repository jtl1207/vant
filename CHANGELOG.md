# 更新日志 / Changelog

## [Unreleased] - 2026-02-15

### Added / 新增功能
- ✅ **白屏问题修复 / White Screen Fix**: 添加了完整的错误处理机制
  - 当网页无法加载时，显示友好的错误页面而不是空白屏幕
  - 错误页面包含"重新加载"按钮，用户可以重试
  - When webpage fails to load, shows a friendly error page instead of blank screen
  - Error page includes a "Reload" button for users to retry

- ✅ **页面加载状态跟踪 / Page Loading State Tracking**
  - 添加 `onPageStarted` 回调来跟踪页面开始加载
  - 添加 `onPageFinished` 回调来跟踪页面加载完成
  - Added `onPageStarted` callback to track when page starts loading
  - Added `onPageFinished` callback to track when page finishes loading

- ✅ **改进的域名验证 / Improved Domain Validation**
  - 支持 `data:` URL 方案（用于错误页面）
  - 严格的域名后缀匹配，防止恶意重定向
  - Support for `data:` URL scheme (for error pages)
  - Strict domain suffix matching to prevent malicious redirects

- 📚 **完整的文档 / Complete Documentation**
  - [FAQ.md](FAQ.md) - 常见问题解答，包括白屏问题的详细故障排除
  - [ICON_SETUP.md](ICON_SETUP.md) - 应用图标设置的完整指南
  - [FAQ.md](FAQ.md) - Frequently asked questions with detailed white screen troubleshooting
  - [ICON_SETUP.md](ICON_SETUP.md) - Complete guide for setting up app icons

### Fixed / 修复问题
- 🐛 修复编译完成的 APP 显示白屏的问题
  - 添加网络错误检测和用户友好的错误消息
  - 允许用户在出错时重新加载页面
  - Fixed compiled app showing white screen issue
  - Added network error detection with user-friendly error messages
  - Allows users to reload page when errors occur

- 🐛 修复 patch 文件的 hunk 头部行号计算错误
  - 更新 hunk 头部以匹配实际添加的行数
  - 确保 patch 可以正确应用到 WebApkShell
  - Fixed patch file hunk header line number calculations
  - Updated hunk headers to match actual line counts
  - Ensures patch applies correctly to WebApkShell

### Changed / 更改
- 🔧 默认 WebView 现在加载配置的远程 URL 而不是本地资源
  - 应用直接加载 `app-config.json` 中配置的 `appUrl`
  - 不再需要构建本地网站资源
  - WebView now loads configured remote URL instead of local assets by default
  - App directly loads `appUrl` configured in `app-config.json`
  - No need to build local website assets

- 📝 更新 README 添加白屏修复和图标设置的说明
  - 在快速开始部分添加重要提示
  - 添加 FAQ 和图标设置指南的链接
  - Updated README with white screen fix and icon setup notes
  - Added important notes in Quick Start section
  - Added links to FAQ and icon setup guide

### Technical Details / 技术细节

#### MainActivity.kt 修改 / Modifications
1. **新增导入 / New Imports**:
   ```kotlin
   import android.webkit.WebResourceRequest
   import android.webkit.WebResourceError
   import android.graphics.Bitmap
   import android.widget.Toast
   ```

2. **新增回调方法 / New Callback Methods**:
   - `onPageStarted()` - 页面开始加载时调用
   - `onPageFinished()` - 页面加载完成时调用
   - `onReceivedError()` - 接收到错误时调用，显示错误页面

3. **改进的 URL 验证 / Improved URL Validation**:
   - `shouldOverrideUrlLoading()` 方法中的严格域名检查
   - 支持配置的域名及其所有子域名
   - 阻止并通知用户被拦截的外部链接

#### 错误页面设计 / Error Page Design
- 响应式设计，适配各种屏幕尺寸
- 清晰的错误消息："无法加载页面"
- 用户友好的重试按钮
- 专业的样式设计

### Migration Notes / 迁移注意事项

如果你已经使用旧版本：
1. 拉取最新代码 / Pull latest code
2. 重新构建应用 / Rebuild the app:
   ```bash
   bun run build:app
   ```
3. 如果遇到白屏问题，查看 [FAQ.md](FAQ.md) 进行故障排除

If you're using an older version:
1. Pull the latest code
2. Rebuild the app:
   ```bash
   bun run build:app
   ```
3. If you encounter white screen issues, see [FAQ.md](FAQ.md) for troubleshooting

---

## 未来计划 / Future Plans

- [ ] 添加自定义加载动画支持
- [ ] 添加离线页面缓存功能
- [ ] 支持从 app-config.json 自定义图标路径
- [ ] 添加更多 WebView 配置选项

- [ ] Add custom loading animation support
- [ ] Add offline page caching
- [ ] Support custom icon path from app-config.json
- [ ] Add more WebView configuration options

---

**需要帮助？/ Need Help?**  
查看 [FAQ.md](FAQ.md) 或在 GitHub Issues 中提问。  
See [FAQ.md](FAQ.md) or ask in GitHub Issues.
