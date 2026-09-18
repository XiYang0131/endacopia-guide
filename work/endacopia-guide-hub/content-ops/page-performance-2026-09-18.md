# 页面性能优化 — 2026-09-18

## 范围与测量边界

- 59 页逐页静态检查；本轮只改资源加载和渲染，不改攻略答案、标题、描述及内容更新时间。
- PageSpeed API 两个官方端点均 fetch failed / UND_ERR_CONNECT_TIMEOUT；Chrome PageSpeed 页 js execution timed out after 30s。未取得 Lighthouse、CrUX 或 GSC CWV 实测结果，不声明指标达标。
- 完整广告代码块与部署前逐字比较一致；广告位置、供应商、加载策略未改。

## 实施结果

- 33 页的下一步导航预先写入 HTML，链接/文案保持原样；移除运行时构造代码，减少迟到插入带来的布局偏移风险。
- 桌面侧栏仍预加载；移动端不强制预加载末尾侧栏图。15 张位于长正文之后的高优先级图片改为 lazy；靠前的图片候选保留 eager，不盲目把所有图设为 lazy。该位置判断来自文档结构，尚未做浏览器视口测量。
- 主脚本 25231 → 14444 bytes（未压缩）。搜索缓存卡片文本，连续输入合并至一个 animation frame；滚动检查每帧最多一次，完成 90% 事件后解除监听。
- 6 张授权截图的 1280px/原尺寸版本合计 3780116 → 229700 bytes；4 页共8处图片使用响应式 WebP，JPEG 保留作不支持 WebP 的回退。尺寸/alt/来源署名保留。
- 59 页 main.js 缓存版本更新；未更改 URL/canonical/sitemap 内容日期。

## 验证

- scripts/check-performance.cjs：59页、37个静态下一步区域、124张有尺寸图片；资源候选文件存在，无重复 ID；搜索快速输入/清空/无结果及滚动50/90事件去重通过。
- 通用静态检查：H1、canonical、GA标识、JSON-LD、日期、站内路径及锚点通过。
- 广告代码块不变检查通过。node --check 与 git diff --check 通过。
- 图片抽查：Office 与 Fishing 1280px 版文字可辨。未完成浏览器页面布局或 Lighthouse 复测。
- 首轮生产版本 e151e6b，Vercel READY。59页、main.js、sitemap.xml、robots.txt 均返回200且匹配本地；Phone单次超时后独立复核通过。11个WebP资源均为200且字节一致。
- 线上响应发现授权图的Cache-Control仍为max-age=0：站点子目录已有规则，但生产根目录vercel.json未包含该目录。已补生产根目录规则，复用现有截图长期缓存策略；待复核最终部署。

## 逐页清单

| 页面 | 关键图片 | 正文配图 | 布局稳定性 | 大图资源 |
|---|---|---|---|---|
| / | 按现有布局 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-guides/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-walkthrough/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 原有资源 |
| /endacopia-all-endings/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 原有资源 |
| /endacopia-secret-ending/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-ending-c-not-triggering/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-achievements-guide/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 响应式 WebP |
| /endacopia-100-percent-achievement-checklist/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 原有资源 |
| /endacopia-the-yeti-ending/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-characters/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-clocky/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-mellow/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-wiki/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-play/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-release-date/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-full-game/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-saw-box-code/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-stay-achievement/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-office-secret/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-phone-puzzle-answers/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-patch-notes/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-277-5944/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-timesville-fishing-guide/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-all-fish-guide/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 响应式 WebP |
| /endacopia-misery-town-secret/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-chameleon-battle/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-save-file-location/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-water-break-achievement/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-screenshot-checklist/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-beginner-guide/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-prologue-walkthrough/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-demo-vs-full-game/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-puzzle-solutions/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 原有资源 |
| /endacopia-cheshire-password/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-let-me-go-let-me-talk/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 响应式 WebP |
| /endacopia-boss-fights-guide/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 响应式 WebP |
| /endacopia-map/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-scribbly/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-steam-deck/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-underground/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-trapezist/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-soccer-ball/ | 侧栏懒加载 | 正文延迟 1 张 | 无需动态导航 | 原有资源 |
| /endacopia-download/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /games-like-endacopia/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /how-long-to-beat-endacopia/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-meaning-lore/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-items-guide/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /endacopia-name-puzzle-flashlight/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-clown-theater-puzzle/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-red-ball-guide/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-telescope-puzzle/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-ending-c-complete-route/ | 侧栏懒加载 | 正文延迟 1 张 | 静态导航 | 原有资源 |
| /endacopia-surgeon-answers/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /endacopia-all-secrets/ | 侧栏懒加载 | 保留首屏候选 | 静态导航 | 原有资源 |
| /about/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /contact/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /editorial-policy/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /privacy/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |
| /changelog/ | 侧栏懒加载 | 保留首屏候选 | 无需动态导航 | 原有资源 |

## 复核

- 恢复测量后：首页、Telescope、Puzzle、Soccer、Items、Meaning、Clocky、All Fish、Achievements、Boss、Office phrases 各测 mobile/desktop，同等条件比较。
- 真实用户 p75 目标：LCP ≤2.5s、INP ≤200ms、CLS ≤0.1。需等待真实样本，静态测试不能替代 CrUX。
- sitemap 无新 URL；性能更新不意味着重新收录或排名增长。
- 参考：https://web.dev/articles/optimize-lcp 、https://web.dev/articles/fetch-priority 。
