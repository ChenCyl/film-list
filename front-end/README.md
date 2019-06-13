# Films List

> Web 第二次作业

## 作业完成情况

### 必须项

- [x] 请求并解析 `films.json`
- [x] 分页
- [x] 布局合理，简洁美观（个人觉得还行hhh）

### 可选项

- [x] 电影详情页
- [x] 搜索功能，包括但不限于对电影名进行搜索
- [x] 数据统计及可视化

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

## Demo

![filmlistdemo](assets/filmlistdemo.gif)



--- 

```
rsync av -e ssh --exclude='node_modules' film-list root@47.102.112.138:/mnt/
```

-a ：递归到目录，即复制所有文件和子目录。另外，打开归档模式和所有其他选项（相当于 -rlptgoD）
-v ：详细输出
-e ssh ：使用 ssh 作为远程 shell，这样所有的东西都被加密
--exclude='*.out' ：排除匹配模式的文件，例如 *.out 或 *.c 等。

