# Arathi‘s Minecraft Launcher

## 1. AMCL命令行

### 1.1 install

```bash
# 安装新版本
# 版本名称 1.20.1-forge
# 指定 Minecraft 版本 1.20.1
# 指定 Forge 版本 47.1.28
amcl install 1.20.1-forge --game=1.20.1 --forge=47.1.28
```

### 1.2 mods

#### 1.2.1 初始化mods目录 `init`

命令格式：

```bash
amcl mods init <id> [-nvgslcm]
```

参数说明：

| 参数             | 参数类型       | 短名  | 值类型     | 默认值 | 说明               |
|----------------|------------|-----|---------|-------|------------------|
| id             | positional |     | string  | （必填） | 整合包ID            |
| name           | named      | n   | string  | id     | 整合包名称            |
| version        | named      | v   | string  | 0.0.1  | 整合包版本            |
| game  | named | g   | string  | 1.20.1 | Minecraft版本      |
| loader | named | l | string | Forge | MOD加载器           |
| forge          | flag | | boolean | false  | 使用Forge          |
| fabric         | flag | | boolean | false  | 使用Fabric         |
| source | named | s | string | CurseForge | 优先MOD源           |
| curseforge | flag       | c   | boolean | false | 优先从CurseForge获取MOD |
| modrinth   | flag       | m   | boolean | false | 优先从Modrinth获取MOD   |

注：

* `name`默认与`id`一致
* `game-version`默认与`Minecraft`当前最新版本一致
* `mod-loader`、`forge`和`fabric`这三个参数互斥
* 优先读取`mod-loader`，未获取到`mod-loader`的值，检查`forge`和`fabric`
* `forge`和`fabric`不能都为`true`
* 如果`forge`和`fabric`也没提供，那么默认MOD加载器为`Forge`

命令示例：

```bash
# 在当前目录初始化 modpack 配置文件
# 整合包id为avalon-s2307-1，游戏版本为1.20.1/forge
amcl mods init avalon-s2307-1 --game-version=1.20.1 --forge
```

#### 1.2.2 添加或者更新指定mod `add`

命令格式：

```bash
amcl mods add <modId> [-scma]
```

参数说明：

| 参数         | 参数类型       | 短名  | 值类型     | 默认值        | 说明                |
|------------|------------|-----|---------|------------|-------------------|
| modId      | positional |     | ModId   | (必填)       | MOD的唯一标识          |
| source     | named      | s   | string  | CurseForge | MOD来源             |
| curseforge | flag       | c   | boolean | false      | 从CurseForge获取该MOD |
| modrinth   | flag       | m   | boolean | false      | 从Modrinth获取该MOD    |
| alias | named | a | string? | undefined  | 指定别名 |

ModId可能是`string`，也可能是`number`。

命令示例：

```bash
# 从CurseForge上获取id为245755的MOD（Waystones）
# #开头的是CurseForge的id
amcl mods add #245755
# 由于CurseForge的ID是纯数字，所以#也可以去掉
amcl mods add 245755

# 从CurseForge上获取slug为jei的MOD（JEI）
# @开头的是CurseForge的slug
amcl mods add @jei
# 可以去掉@，使用source参数指定从CurseForge获取
amcl mods add jei --source=CurseForge
# "--source=CurseForge" 可以缩写为 "-c"
amcl mods add jei -c

# 应该没有纯数字的slug，但是如果存在mod的slug是纯数字
# 如"123456"，可以加上@表示它是slug
amcl mods add @123456

# $开头的是Modrinth的id或者slug
# 因为Modrinth的API不区分id还是slug
# 从Modrinth上获取id或者slug为"jei"的MOD
amcl mods add $jei
# 同样可以去掉$，使用source参数指定从Modrinth获取
amcl mods add jei --source=Modrinth
# "--source=Modrinth" 可以缩写为 "-m"
amcl mods add jei -m

# 如果不是数字，会优先作为slug处理
amcl mods add jei
```

#### 1.2.3 更新所有mod `update`

命令格式：

```bash
# 更新整合包中的mod版本
amcl mods update
```

没有别的参数

#### 1.2.4 停用mod `disable`

命令格式：

```bash
amcl mods disable <modId> [-scm]
```

参数说明：

| 参数         | 参数类型       | 短名  | 值类型     | 默认值        | 说明               |
|------------|------------|-----|---------|------------|------------------|
| modId      | positional |     | ModId   | (必填)       | MOD的唯一标识         |
| source     | named      | s   | string  | CurseForge | MOD来源            |
| curseforge | flag       | c   | boolean | false      | 该MOD来自CurseForge |
| modrinth   | flag       | m   | boolean | false      | 该MOD来自Modrinth  |

#### 1.2.5 重命名mod `rename`

命令格式：

```bash
amcl mods rename <modId> [-scm] <alias>
```

参数说明：

| 参数         | 参数类型       | 短名  | 值类型     | 默认值        | 说明               |
|------------|------------|-----|---------|------------|------------------|
| modId      | positional |     | ModId   | (必填)       | MOD的唯一标识         |
| source     | named      | s   | string  | CurseForge | MOD来源            |
| curseforge | flag       | c   | boolean | false      | 该MOD来自CurseForge |
| modrinth   | flag       | m   | boolean | false      | 该MOD来自Modrinth   |
| alias | positional | | string | (必填) | 新别名              |

## Modpack 文件结构

### Modpack 结构

| 字段          | 类型      | 说明            |
|-------------|---------|---------------|
| id          | string  | 整合包ID         |
| name        |  string       | 整合包名称         |
| version     |    string     | 整合包版本         |
| gameVersion  |    string     | `Minecraft`版本 |
| modLoader    |  string       | 加载器类型         |
| mods        | `Mod[]` | 模组信息          |
| deps| `Mod[]` | 依赖模组信息          |

### Mod 结构

| 字段     | 类型      | 说明                         |
|--------|---------|----------------------------|
| source | string  | MOD来源                      |
| id     | string  | 平台上Mod的`id`，CurseForge是纯数字 |
| slug   | string  | 平台上Mod的`slug`              |
| alias  | string? | 别名                         |
| file | string? | 平台上的文件版本`id`               |

示例：

```json
{
  "id": "avalon-s23071",
  "name": "Avalon Server S2307 Modpack",
  "version": "0.1.0",
  "gameVersion": "1.20.1",
  "modLoader": "forge",
  "mods": [
    {
      "source": "CurseForge",
      "id": 245755,
      "slug": "waystones",
      "file": 4635315
    }
  ],
  "deps": []
}
```
