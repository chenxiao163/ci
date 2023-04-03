# 项目开发流程

```bash
# 克隆项目
git clone http://172.16.8.232:12345/wulei/hulai_gm.git

# 进入项目目录
cd hulai_gm

# 安装依赖
npm install

# 启动服务
npm run dev
```

This will automatically open http://localhost:9528

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
