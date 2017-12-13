## 概述
网页常见剩余时间倒计时组件。

## Attributes
|  参数  | 说明  | 类型  | 可选值  | 默认值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| time  | 结束时间点，时间格式  | string |  ---   | ---  |
| format | 模板参数    | string |  ---                        |  {%d}天{%h}时{%m}分{%s}秒 |
| timetype  | 传入时间类型，datetime：结束时间（时间格式），second：剩余时间（秒）      | string | datetime, second  |  datetime |
| done-text |  倒计时结束后显示文字 |  string  |         | 已结束                  |
| time-pause |  暂停按钮 |  Boolean  |   true，false      | false                  |

##Events
|  事件名称 | 说明  |
| :------------ | :------------ |
| callback  | 倒计时结束后调用方法  |
| timepause  | 暂停后调用的方法  |



