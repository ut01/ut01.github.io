# Contributing / 参与贡献

Help UT Austin students find reliable resources in English and Chinese. Small, focused changes are welcome: report a broken link, improve search keywords, verify a guide, or fix a navigation bug.

欢迎通过修复链接、补充中英文关键词、核对指南或修复导航问题，帮助 UT Austin 学生找到可靠资源。每次贡献聚焦一个明确问题即可。

## Choose a task / 选择任务

- **Resource links:** Check one category in `_data/links.yml` for outdated URLs and use the current official destination. Explain any required login in your PR.
- **Search:** Add useful English and Chinese synonyms to an existing entry's `keywords`, then verify that both find the intended card.
- **Guides:** Compare one page in `guides/` with the official sources it cites. Correct outdated steps and update its source dates when you verify it.
- **Navigation:** Reproduce a problem at a narrow mobile width and a desktop width; include the steps, browser, and expected result in an issue or PR.

- **资源链接：** 检查 `_data/links.yml` 中一个分类的链接，替换为当前官方地址；在 PR 中说明是否需要登录。
- **搜索：** 为现有条目的 `keywords` 补充实用的中英文同义词，并确认两种语言都能找到对应卡片。
- **指南：** 对照官方来源核对 `guides/` 中的一篇指南，修正过时步骤，并按实际核对时间更新来源日期。
- **导航：** 分别在手机和桌面宽度下复现问题，在 issue 或 PR 中提供步骤、浏览器和预期结果。

Check [existing issues](https://github.com/ut01/ut01.github.io/issues) for related work. If you want to maintain a category or help review contributions, comment on [#26](https://github.com/ut01/ut01.github.io/issues/26) with your preferred area, relevant experience, and availability. A maintainer coordinates access separately; a fork is enough to submit your first PR.

先查看[已有 issue](https://github.com/ut01/ut01.github.io/issues)，了解是否有人在处理相关问题。若想长期维护某个分类或参与审核，请在 [#26](https://github.com/ut01/ut01.github.io/issues/26) 中说明意向领域、相关经验和可投入的时间。仓库权限由维护者另行协调；首次提交 PR 只需 Fork。

## Edit the right file / 修改对应文件

Homepage resource cards come from `_data/links.yml`. Add a link under an existing section's `links:` list using the same indentation:

首页资源卡片来自 `_data/links.yml`。请按现有缩进，在对应分类的 `links:` 列表中添加条目：

```yaml
      - url: "https://global.utexas.edu/"
        title: "Texas Global"
        icon: "fad fa-link"
        keywords: "Texas Global, international, global engagement, 国际事务, 国际交流"
```

This is a format example; check whether the resource already exists before adding it. Keep titles short and keywords relevant. Reuse an icon already displayed successfully on the site. New categories need both `section` and `section_zh`.

以上为格式示例；添加前请确认资源尚未收录。标题应简短，关键词应相关。优先复用网站已正常显示的图标。新分类应同时填写 `section` 和 `section_zh`。

Use `index.html` for homepage layout, `assets/navigation.js` for homepage interactions, and `_includes/block-grid.html` for card markup. Edit shared styles in `style.scss` and `_sass/*.scss`; Jekyll generates `style.css` from these sources. Guides are standalone HTML files in `guides/`; follow the bilingual titles, official-source disclaimer, source footer, and return link described in [CLAUDE.md](CLAUDE.md). Register new guides in `_data/links.yml` with English and Chinese keywords.

首页布局位于 `index.html`，首页交互位于 `assets/navigation.js`，卡片模板位于 `_includes/block-grid.html`。共用样式请修改 `style.scss` 和 `_sass/*.scss`，Jekyll 会从这些源文件生成 `style.css`。指南是 `guides/` 中的独立 HTML 文件；请遵循 [CLAUDE.md](CLAUDE.md) 中的双语标题、官方来源免责声明、来源页脚和返回链接规范。新增指南还需在 `_data/links.yml` 中登记，并提供中英文关键词。

## Validate your change / 检查修改

With Ruby 3.3 and Bundler installed, run these commands from the repository root and open http://127.0.0.1:4000:

安装 Ruby 3.3 和 Bundler 后，在仓库根目录运行以下命令，然后打开 http://127.0.0.1:4000：

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

A plain HTTP server does not render the homepage's Liquid templates or YAML-driven cards. Open the rendered site to verify link and search changes. For a build without a preview server, run `bundle exec jekyll build`.

普通 HTTP 服务器无法渲染首页 Liquid 模板和 YAML 生成的卡片；检查链接和搜索时请使用生成后的网站。仅构建、不启动预览服务器时，运行 `bundle exec jekyll build`。

For navigation or interaction changes, run the browser regression suite with Node.js and npm installed:

修改导航或交互后，请在安装 Node.js 和 npm 的环境中运行浏览器回归检查：

```bash
npm ci
npx playwright install chromium webkit
npm test
```

The suite starts its own Jekyll server on port 4173 and runs Chromium and WebKit checks. Install the Ruby dependencies above first and leave that port available.

检查会自动在 4173 端口启动 Jekyll 服务器，并运行 Chromium 和 WebKit 检查。请先安装上述 Ruby 依赖，并确保该端口可用。

Before submitting:

1. Run `git diff --check` and review your diff for unrelated changes.
2. Open each changed destination and check that it serves the intended task. If it requires an EID or another account, report how far you could verify it.
3. Search for the changed card with at least one English and one Chinese keyword.
4. Check the relevant page at mobile and desktop widths. For interaction changes, also check keyboard access and any open/close behavior.
5. Include screenshots for visible layout changes and describe any checks you could not run.

提交前：

1. 运行 `git diff --check`，检查差异中是否包含无关修改。
2. 打开每个修改后的目标地址，确认其用途正确。如需 EID 或其他账号，说明实际验证到哪一步。
3. 分别使用至少一个英文词和一个中文词搜索对应卡片。
4. 检查相关页面在手机及桌面宽度下的表现。交互修改还应检查键盘操作及打开、关闭行为。
5. 布局变化请附截图，并说明无法执行的检查。

## Submit and review / 提交与审核

Fork the repository, create a branch, and open a PR against `main`. State the problem, what changed, the related issue, and your validation results. Link official sources for factual guide updates. Keep private application details, credentials, and student records out of issues, screenshots, and commits.

Fork 仓库、创建分支，并向 `main` 提交 PR。说明问题、修改内容、相关 issue 和检查结果。指南中的事实更新请附官方来源链接。Issue、截图和提交中请勿包含私人申请信息、凭据或学生记录。

A maintainer reviews correctness, bilingual discoverability, accessibility, and scope before merging. Respond to review comments in the same PR. Repository invitations and external promotion require separate coordination; a documentation or code change does not complete those actions.

维护者会在合并前检查内容准确性、中英文搜索、无障碍操作及修改范围。请在同一 PR 中回应审核意见。协作者邀请和外部推广需另行协调，文档或代码修改本身不代表这些事项已经完成。
