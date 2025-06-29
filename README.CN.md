# ut01 - 德州大学奥斯汀分校的学生网页导航！


[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/lang-中文-brown.svg)](README.CN.md)
[![Website](https://img.shields.io/website?url=https%3A//ut01.github.io)](https://ut01.github.io/) [![GitHub stars](https://img.shields.io/github/stars/ut01/ut01.github.io)](https://github.com/ut01/ut01.github.io) [![GitHub forks](https://img.shields.io/github/forks/ut01/ut01.github.io)](https://github.com/ut01/ut01.github.io/fork) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **UT Austin学生的一站式导航** 🤘  
> 快速访问重要的大学链接，无需深度导航

# **在线访问**: [ut01.github.io](https://ut01.github.io/)

---

## 什么是ut01？

**ut01** 是一个由学生自建的导航主页，将重要的UT Austin链接集中在一个地方。由 [Koutian Wu](https://github.com/ktwu01/)，一名UT Austin博士生（24级）创建，旨在解决浏览复杂大学网站层级和频繁登录超时的困扰。

![ut01 Screenshot](./assets/Screenshot-Multiple-Device-ut01.png)
![ut01 Screenshot](./assets/Screenshot-Mobile-Device-ut01.png)

---

## 为什么要做ut01？

作为UT学生，我经常被以下问题困扰：

- **深层链接导航**: 简单的任务如查看饭卡余额需要通过复杂的菜单多次点击
- **频繁退出登录**: UT链接会自动退出登录，使书签重定向到"用EID登录"页面
- **资源分散**: 重要的学生服务分布在数十个不同的门户网站上

所以我建立这个集中的枢纽，组织学生真正需要的一切。

---

## 主要功能

### 🎯 **核心分类**
- **关键门户**: MyUT, UT Direct, Canvas, 紧急信息
- **学术事务**: 成绩查询, 课程表, 图书馆, 注册服务
- **财务相关**: 学费, 经济援助, 免费申请, 税务表格
- **校园生活**: 住宿, 餐饮, 交通, 娱乐设施
- **技术服务**: EID帮助, VPN, Microsoft 365, TACC
- **国际学生服务**: ISSS, 签证, 工作授权

### 🚀 **学生友好设计**
- **快速访问**: 无需深度导航
- **书签就绪**: 可设为浏览器主页
- **持续更新**: 由学生维护确保相关性
- **移动响应**: 适配所有设备

---

## 使用方法

1. **访问** [ut01.github.io](https://ut01.github.io/)
2. **收藏** 常用链接
3. **设为主页** 便于即时访问
4. **搜索** 使用搜索功能查找特定服务

---

## 参与贡献

想要添加链接或修复问题？欢迎贡献！

### 快速步骤
1. **Fork** 此仓库
2. **编辑** `index.html` 按照模板：
   ```html
   <!-- 添加新链接 -->
   {% include block-grid.html url="https://example.utexas.edu" title="服务名称" icon="fad fa-icon-name" %}
   ```
3. **提交** pull request

### 查找图标
在 [FontAwesome](https://fontawesome.com/search) 搜索图标并更新 `icon` 属性。

---

## 技术详情

- **框架**: Jekyll 配自定义模板
- **托管**: GitHub Pages
- **许可证**: MIT (修改自 [SmartHypercube/ustclife](https://github.com/SmartHypercube/ustclife))
- **维护**: 学生驱动的更新

---

## 联系与支持

- **问题反馈**: [报告问题或建议添加](https://github.com/ut01/ut01.github.io/issues)
- **开发者**: [联系维护者](https://github.com/ktwu01/ktwu01/blob/main/README.md)
- **社区**: 由UT学生创建，为UT学生服务

---

<div align="center">

**🤘 Hook 'em Horns! 由UT Austin博士生用❤️制作**

[![GitHub stars](https://img.shields.io/github/stars/ut01/ut01.github.io)](https://github.com/ut01/ut01.github.io) [![访问网站](https://img.shields.io/badge/访问-ut01.github.io-orange)](https://ut01.github.io/)

*将ut01.github.io设为主页，再也不用到处找UT链接了！*

</div>