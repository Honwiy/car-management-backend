
-- ----------------------------
-- Records of PermissionSection
-- ----------------------------
BEGIN;
INSERT INTO `PermissionSection` 
VALUES (1, 1, 'SALES_BUSINESS', '销售业务', '销售业务', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (2, 1, 'SERVICE_BUSINESS', '售后业务', '售后业务', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (3, 1, 'SALES_BUSINESS', '衍生业务', '衍生业务', 3, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (4, 1, 'SALES_BUSINESS', '财务业务', '财务业务', 4, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (5, 1, 'SALES_BUSINESS', '行政业务', '行政业务', 5, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (6, 1, 'SALES_BUSINESS', '仓库业务', '仓库业务', 6, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionSection` 
VALUES (7, 1, 'SALES_BUSINESS', '系统设置', '系统设置', 7, 1, NOW(),1,NULL, NULL);
COMMIT;

-- ----------------------------
-- Records of PermissionCategory
-- ----------------------------
BEGIN;
INSERT INTO `PermissionCategory` 
VALUES (1, 1, 'ADD_CUSTOMER', '新增客户', '新增客户', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (2, 1, 'ORDER_MANAGEMENT', '订单管理', '订单管理', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (3, 3, 'BOUTIQUE_SALES', '精品购买', '精品购买', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (4, 3, 'BOUTIQUE_MANAGEMENT', '精品管理', '精品管理', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (5, 4, 'PURECHASE_APPROVAL', '采购审批', '采购审批', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (6, 6, 'COMMODITY_PURECHASE', '商品采购', '商品采购', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (7, 6, 'WAREHOUSE_QUERIES', '库存查看', '库存查看', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (8, 6, 'COMMODITY_WAREHOUSING', '商品入库', '商品入库', 3, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionCategory` 
VALUES (9, 7, 'USER_PERMISSION', '用户权限', '用户权限', 1, 1, NOW(),1,NULL, NULL);
COMMIT;

-- ----------------------------
-- Records of PermissionPage
-- ----------------------------
BEGIN;
INSERT INTO `PermissionPage` 
VALUES (1, 1, 'ADD_CUSTOMER', '新增客户', '新增客户', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (2, 2, 'ORDER_MANAGEMENT', '订单管理', '订单管理', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (3, 3, 'BOUTIQUE_SALES', '精品购买', '精品购买', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (4, 4, 'BOUTIQUE_MANAGEMENT', '精品管理', '精品管理', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (5, 5, 'PURECHASE_APPROVAL', '采购审批', '采购审批', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (6, 6, 'CAR_PURECHASE', '车辆采购', '车辆采购', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (7, 6, 'SERVICE_PURECHASE', '售后采购', '售后采购', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (8, 6, 'BOUTIQUE_PURECHASE', '精品采购', '精品采购', 3, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (9, 7, 'CAR_STOCK', '车辆库存', '车辆库存', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (10, 7, 'SERVICE_STOCK', '售后库存', '售后库存', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (11, 7, 'BOUTIQUE_STOCK', '精品库存', '精品库存', 3, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (12, 8, 'CAR_IMPORT', '车辆导入', '车辆导入', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (13, 8, 'ACCESSORY_IMPORT', '售后备件导入', '售后备件导入', 2, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (14, 8, 'BOUTIQUE_IMPORT', '精品导入', '精品导入', 3, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionPage` 
VALUES (15, 9, 'USER_PERMISSION', '用户权限', '用户权限', 1, 1, NOW(),1,NULL, NULL);
COMMIT;


-- ----------------------------
-- Records of PermissionAction
-- ----------------------------
BEGIN;
INSERT INTO `PermissionAction` 
VALUES (1,'ADD_CUSTOMER_VIEW',1,'查看', 'ADD_CUSTOMER_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (2,'ORDER_MANAGEMENT_VIEW',2, '查看', 'ORDER_MANAGEMENT_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (3,'BOUTIQUE_SALES_VIEW',3, '查看', 'BOUTIQUE_SALES_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (4,'BOUTIQUE_MANAGEMENT_VIEW',4, '查看', 'BOUTIQUE_MANAGEMENT_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (5,'PURECHASE_APPROVAL_VIEW',5, '查看', 'PURECHASE_APPROVAL_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (6,'CAR_PURECHASE_VIEW',6, '查看', 'CAR_PURECHASE_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (7,'SERVICE_PURECHASE_VIEW',7, '查看', 'SERVICE_PURECHASE_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (8,'BOUTIQUE_PURECHASE_VIEW',8, '查看', 'BOUTIQUE_PURECHASE_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (9,'CAR_STOCK_VIEW',9, '查看', 'CAR_STOCK_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (10,'SERVICE_STOCK_VIEW',10, '查看', 'SERVICE_STOCK_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (11,'BOUTIQUE_STOCK_VIEW',11, '查看', 'BOUTIQUE_STOCK_VIEW',1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (12,'CAR_IMPORT_VIEW',12, '查看', 'CAR_IMPORT_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (13,'ACCESSORY_IMPORT_VIEW',13, '查看', 'ACCESSORY_IMPORT_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (14,'BOUTIQUE_IMPORT_VIEW',14, '查看', 'BOUTIQUE_IMPORT_VIEW', 1, 1, NOW(),1,NULL, NULL);
INSERT INTO `PermissionAction` 
VALUES (15,'USER_PERMISSION_VIEW',15, '查看', 'BOUTIQUE_IMPORT_VIEW', 1, 1, NOW(),1,NULL, NULL);
COMMIT;


-- ----------------------------
-- Records of GeneralOption-branchname
-- ----------------------------
BEGIN;
insert into `GeneralOption` ( `BrandId`, `FuncitonName`, `Code`, `Name`, `SubName`, `PermissionId`, `isActive`, `ParentId`, `Category`) 
values (null, 'BRANCHNAME', 'BYD-HuabeiRoad', '比亚迪-华北路店', null, null, '1', null, null);
insert into `GeneralOption` ( `BrandId`, `FuncitonName`, `Code`, `Name`, `SubName`, `PermissionId`, `isActive`, `ParentId`, `Category`) 
values (null, 'BRANCHNAME', 'BYD-HengLong', '比亚迪-恒隆店', null, null, '1', null, null);
insert into `GeneralOption` ( `BrandId`, `FuncitonName`, `Code`, `Name`, `SubName`, `PermissionId`, `isActive`, `ParentId`, `Category`) 
values (null, 'BRANCHNAME', 'BYD-ZhuangHe', '比亚迪-庄河店', null, null, '1', null, null);
insert into `GeneralOption` ( `BrandId`, `FuncitonName`, `Code`, `Name`, `SubName`, `PermissionId`, `isActive`, `ParentId`, `Category`) 
values (null, 'BRANCHNAME', 'Cherry-ChengXin', '奇瑞-成信店', null, null, '1', null, null);
insert into `GeneralOption` ( `BrandId`, `FuncitonName`, `Code`, `Name`, `SubName`, `PermissionId`, `isActive`, `ParentId`, `Category`) 
values (null, 'BRANCHNAME', 'Cherry-HuabeiRoad', '奇瑞-华北路店', null, null, '1', null, null);
COMMIT;