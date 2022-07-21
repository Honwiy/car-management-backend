enum CAR_STATUS_MAPPING {
  // '车辆状态, 0: 在途, 1: 在库'
  INTRANSIT = '在途',
  INSTOREHOUSE = '在库'
}

enum CAR_SELLING_STATUS_MAPPING {
  // '销售状态, 0: 已销售, 1: 未销售'
  UNSALED = '未销售',
  SALED = '已销售'
}

enum CAR_STOREHOUSE_STATUS_MAPPING {
  // '库存状态, 0: 可销售库存, 1: 锁定库存, 2: 退货库存, 3: 换货库存, 4:采购中库存, 5: 调拨库存'
  SALEDABLE_INVENTORY = '可销售库存',
  LOCKED_INVENTORY = '已锁定库存',
  RETURNED_INVENTORY = '退货库存',
  CHANGED_INVENTORY = '换货库存',
  PURCHASE_ORDERING_INVENTORY = '采购中库存',
  TRANSFERED_INVENTORY = '已调拨库存'
}

export {
  CAR_STATUS_MAPPING,
  CAR_SELLING_STATUS_MAPPING,
  CAR_STOREHOUSE_STATUS_MAPPING
}
