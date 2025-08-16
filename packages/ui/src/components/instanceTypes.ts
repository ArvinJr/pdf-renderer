/**
 * 动态生成组件实例类型
 */
import type * as components from './index'

type ComponentInstanceMap = {
  [K in keyof typeof components]: InstanceType<typeof components[K]>
}

// 按名称获取单个组件实例类型 TODO 每添加一个组件需单独来此维护
export type XxTemplate1Instance = ComponentInstanceMap['XxTemplate1']
