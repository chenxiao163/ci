"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideManager = exports.GameMail = exports.GameMailManager = exports.GameFlyBoxManager = exports.DungeonManager = exports.HookItem = exports.HookReward = exports.TimeItem = exports.GamePlayerProp = exports.GameSlime = exports.GameItem = exports.GameItemManager = exports.GamePlayer = exports.LoginRewardRecord = exports.LoginReward = exports.RecoverHpInfo = exports.UpgradeInfo = exports.UnitDeadInfo = exports.FieldEndInfo = exports.FieldBeginInfo = exports.AttackDamageInfo = exports.AttackBeginInfo = exports.SkillValue = exports.SkillValueManager = exports.FightProps = exports.GameSkillManager = exports.GamePartnerManager = exports.GameEquipManager = exports.GameGoods = exports.GameCollectionManager = exports.Unit = exports.UnitItem = exports.GameBlessManager = exports.GameBlessItem = exports.TaskCountItem = exports.GameSimpleTask = exports.ResearchNode = exports.ResearchNodes = exports.GameResearchManager = exports.MineReward = exports.MineRewards = exports.MineItem = exports.MineMold = exports.MineMolds = exports.MineItems = exports.GameMineManager = exports.GameDrawCard = exports.ADSInfo = exports.ADSInfos = exports.GameADSManager = void 0;
exports.SevenTaskManager = void 0;
// 代码工具生成，请勿手动更改！！！ version=1.1.0
const GameObject_1 = require("./GameObject");
class GameADSManager extends GameObject_1.GameObject {
  constructor() {
    super("GameADSManager");
    this.addObjectMember(1, new GameObject_1.GameObjectMap(ADSInfo));
  }
  // 上次看广告的时间
  get LastADSTime() { return (0, GameObject_1.meta_get)(this, 0); }
  set LastADSTime(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 各类广告信息集合
  get ADSInfos() { return (0, GameObject_1.meta_get)(this, 1); }
  set ADSInfos(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.GameADSManager = GameADSManager;
class ADSInfos extends GameObject_1.GameObject {
  constructor() {
    super("ADSInfos");
  }
}
exports.ADSInfos = ADSInfos;
class ADSInfo extends GameObject_1.GameObject {
  constructor() {
    super("ADSInfo");
  }
  // 广告类型
  get ADSType() { return (0, GameObject_1.meta_get)(this, 0); }
  set ADSType(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 总次数
  get Times() { return (0, GameObject_1.meta_get)(this, 1); }
  set Times(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 当日次数
  get DayTimes() { return (0, GameObject_1.meta_get)(this, 2); }
  set DayTimes(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 上次看广告/分享时间
  get LastTime() { return (0, GameObject_1.meta_get)(this, 3); }
  set LastTime(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.ADSInfo = ADSInfo;
class GameDrawCard extends GameObject_1.GameObject {
  constructor() {
    super("GameDrawCard");
  }
  // 等级
  get level() { return (0, GameObject_1.meta_get)(this, 0); }
  set level(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 经验
  get exp() { return (0, GameObject_1.meta_get)(this, 1); }
  set exp(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 抽卡次数
  get drawCardCount() { return (0, GameObject_1.meta_get)(this, 2); }
  set drawCardCount(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameDrawCard = GameDrawCard;
class GameMineManager extends GameObject_1.GameObject {
  constructor() {
    super("GameMineManager");
    this.addObjectMember(4, new GameObject_1.GameObjectMap(MineItem));
    this.addObjectMember(5, new GameObject_1.GameObjectMap(MineMold));
  }
  // 当前深度
  get Deep() { return (0, GameObject_1.meta_get)(this, 0); }
  set Deep(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 已经生成到的深度
  get DeepEnd() { return (0, GameObject_1.meta_get)(this, 1); }
  set DeepEnd(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 下次刷新的时间
  get LastRefreshTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set LastRefreshTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 下次刷新时间剩余秒数
  get NextRefreshLeft() { return (0, GameObject_1.meta_get)(this, 3); }
  set NextRefreshLeft(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 矿石集合
  get Items() { return (0, GameObject_1.meta_get)(this, 4); }
  set Items(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 模组集合
  get Molds() { return (0, GameObject_1.meta_get)(this, 5); }
  set Molds(value) { (0, GameObject_1.meta_set)(this, 5, value); }
}
exports.GameMineManager = GameMineManager;
class MineItems extends GameObject_1.GameObject {
  constructor() {
    super("MineItems");
  }
}
exports.MineItems = MineItems;
class MineMolds extends GameObject_1.GameObject {
  constructor() {
    super("MineMolds");
  }
}
exports.MineMolds = MineMolds;
class MineMold extends GameObject_1.GameObject {
  constructor() {
    super("MineMold");
  }
  // 模组Id
  get moldId() { return (0, GameObject_1.meta_get)(this, 0); }
  set moldId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 深度
  get Y() { return (0, GameObject_1.meta_get)(this, 1); }
  set Y(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 横坐标位置
  get X() { return (0, GameObject_1.meta_get)(this, 2); }
  set X(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.MineMold = MineMold;
class MineItem extends GameObject_1.GameObject {
  constructor() {
    super("MineItem");
  }
  // 深度
  get Y() { return (0, GameObject_1.meta_get)(this, 0); }
  set Y(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 横坐标位置
  get X() { return (0, GameObject_1.meta_get)(this, 1); }
  set X(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 地块类型
  get SlotType() { return (0, GameObject_1.meta_get)(this, 2); }
  set SlotType(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 资源类型
  get OreType() { return (0, GameObject_1.meta_get)(this, 3); }
  set OreType(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 当前位置耐久
  get HP() { return (0, GameObject_1.meta_get)(this, 4); }
  set HP(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 宝箱Id
  get BoxId() { return (0, GameObject_1.meta_get)(this, 5); }
  set BoxId(value) { (0, GameObject_1.meta_set)(this, 5, value); }
  // 点亮
  get Bright() { return (0, GameObject_1.meta_get)(this, 6); }
  set Bright(value) { (0, GameObject_1.meta_set)(this, 6, value); }
}
exports.MineItem = MineItem;
class MineRewards extends GameObject_1.GameObject {
  constructor() {
    super("MineRewards");
  }
}
exports.MineRewards = MineRewards;
class MineReward extends GameObject_1.GameObject {
  constructor() {
    super("MineReward");
  }
  // 道具ID
  get ItemId() { return (0, GameObject_1.meta_get)(this, 0); }
  set ItemId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 道具数量
  get Count() { return (0, GameObject_1.meta_get)(this, 1); }
  set Count(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.MineReward = MineReward;
class GameResearchManager extends GameObject_1.GameObject {
  constructor() {
    super("GameResearchManager");
    this.addObjectMember(2, new GameObject_1.GameObjectMap(ResearchNode));
  }
  // 当前研究的节点Id
  get CurResearchNodeId() { return (0, GameObject_1.meta_get)(this, 0); }
  set CurResearchNodeId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 当前研究的结束时间
  get CurResearchEndTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set CurResearchEndTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 解锁的节点集合
  get UnlockedNodes() { return (0, GameObject_1.meta_get)(this, 2); }
  set UnlockedNodes(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameResearchManager = GameResearchManager;
class ResearchNodes extends GameObject_1.GameObject {
  constructor() {
    super("ResearchNodes");
  }
}
exports.ResearchNodes = ResearchNodes;
class ResearchNode extends GameObject_1.GameObject {
  constructor() {
    super("ResearchNode");
  }
  // 节点Id
  get NodeId() { return (0, GameObject_1.meta_get)(this, 0); }
  set NodeId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 所处阶段
  get Stage() { return (0, GameObject_1.meta_get)(this, 1); }
  set Stage(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 节点状态
  get State() { return (0, GameObject_1.meta_get)(this, 2); }
  set State(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.ResearchNode = ResearchNode;
class GameSimpleTask extends GameObject_1.GameObject {
  constructor() {
    super("GameSimpleTask");
  }
  // 任务ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 完成数量
  get count() { return (0, GameObject_1.meta_get)(this, 1); }
  set count(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 是否领奖
  get getReward() { return (0, GameObject_1.meta_get)(this, 2); }
  set getReward(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 完成数量
  get finishCount() { return (0, GameObject_1.meta_get)(this, 3); }
  set finishCount(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 完成时间
  get finishTime() { return (0, GameObject_1.meta_get)(this, 4); }
  set finishTime(value) { (0, GameObject_1.meta_set)(this, 4, value); }
}
exports.GameSimpleTask = GameSimpleTask;
class TaskCountItem extends GameObject_1.GameObject {
  constructor() {
    super("TaskCountItem");
  }
  // 矿山研究次数
  get MineResearch() { return (0, GameObject_1.meta_get)(this, 0); }
  set MineResearch(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // slm历史等级数
  get SlmLevel() { return (0, GameObject_1.meta_get)(this, 1); }
  set SlmLevel(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 矿山破坏地块总次数
  get DestroyMineBox() { return (0, GameObject_1.meta_get)(this, 2); }
  set DestroyMineBox(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 观看广告总次数
  get WatchAdSum() { return (0, GameObject_1.meta_get)(this, 3); }
  set WatchAdSum(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 飞舞的箱子的总次数
  get FlyBoxSum() { return (0, GameObject_1.meta_get)(this, 4); }
  set FlyBoxSum(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 祝福的总次数
  get BlessSum() { return (0, GameObject_1.meta_get)(this, 5); }
  set BlessSum(value) { (0, GameObject_1.meta_set)(this, 5, value); }
}
exports.TaskCountItem = TaskCountItem;
class GameBlessItem extends GameObject_1.GameObject {
  constructor() {
    super("GameBlessItem");
  }
  // 祝福ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 当前等级
  get Level() { return (0, GameObject_1.meta_get)(this, 1); }
  set Level(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 当前经验
  get Exp() { return (0, GameObject_1.meta_get)(this, 2); }
  set Exp(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 自动祝福
  get IsAuto() { return (0, GameObject_1.meta_get)(this, 3); }
  set IsAuto(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 祝福有效期
  get ExpireTime() { return (0, GameObject_1.meta_get)(this, 4); }
  set ExpireTime(value) { (0, GameObject_1.meta_set)(this, 4, value); }
}
exports.GameBlessItem = GameBlessItem;
class GameBlessManager extends GameObject_1.GameObject {
  constructor() {
    super("GameBlessManager");
    this.addObjectMember(0, new GameGoods());
    this.addObjectMember(1, new GameObject_1.GameObjectMap(GameBlessItem));
  }
  // Vip
  get Vip() { return (0, GameObject_1.meta_get)(this, 0); }
  set Vip(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 祝福集合
  get CurrBless() { return (0, GameObject_1.meta_get)(this, 1); }
  set CurrBless(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.GameBlessManager = GameBlessManager;
class UnitItem extends GameObject_1.GameObject {
  constructor() {
    super("UnitItem");
  }
  // 物品ID 或 技能ID 或 伙伴ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 当前等级
  get Level() { return (0, GameObject_1.meta_get)(this, 1); }
  set Level(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 当前等级
  get LevelNeed() { return (0, GameObject_1.meta_get)(this, 2); }
  set LevelNeed(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.UnitItem = UnitItem;
class Unit extends GameObject_1.GameObject {
  constructor() {
    super("Unit");
    this.addObjectMember(2, new GameObject_1.GameObjectMap(UnitItem));
  }
  // 单元名称
  get UnitName() { return (0, GameObject_1.meta_get)(this, 0); }
  set UnitName(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 单元当前等级
  get UnitLevel() { return (0, GameObject_1.meta_get)(this, 1); }
  set UnitLevel(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 单元所需集合（物品、技能、伙伴）
  get UnitItems() { return (0, GameObject_1.meta_get)(this, 2); }
  set UnitItems(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 单元状态 0-未激活 1-不可强化 2-可强化 3-满级
  get UnitState() { return (0, GameObject_1.meta_get)(this, 3); }
  set UnitState(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.Unit = Unit;
class GameCollectionManager extends GameObject_1.GameObject {
  constructor() {
    super("GameCollectionManager");
    this.addObjectMember(0, new GameObject_1.GameObjectMap(Unit));
    this.addObjectMember(1, new GameObject_1.GameObjectMap(Unit));
    this.addObjectMember(2, new GameObject_1.GameObjectMap(Unit));
  }
  // 装备图鉴
  get EquipUnits() { return (0, GameObject_1.meta_get)(this, 0); }
  set EquipUnits(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 技能图鉴
  get SkillUnits() { return (0, GameObject_1.meta_get)(this, 1); }
  set SkillUnits(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 伙伴图鉴
  get PartnerUnits() { return (0, GameObject_1.meta_get)(this, 2); }
  set PartnerUnits(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameCollectionManager = GameCollectionManager;
class GameGoods extends GameObject_1.GameObject {
  constructor() {
    super("GameGoods");
  }
  // 物品ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 当前等级
  get Level() { return (0, GameObject_1.meta_get)(this, 1); }
  set Level(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 当前道具数量
  get Count() { return (0, GameObject_1.meta_get)(this, 2); }
  set Count(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameGoods = GameGoods;
class GameEquipManager extends GameObject_1.GameObject {
  constructor() {
    super("GameEquipManager");
    this.addObjectMember(2, new GameObject_1.GameObjectMap(GameGoods));
  }
  // 武器装备ID
  get WeaponPos() { return (0, GameObject_1.meta_get)(this, 0); }
  set WeaponPos(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 防具装备ID
  get ArmorPos() { return (0, GameObject_1.meta_get)(this, 1); }
  set ArmorPos(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 装备集合
  get Equips() { return (0, GameObject_1.meta_get)(this, 2); }
  set Equips(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameEquipManager = GameEquipManager;
class GamePartnerManager extends GameObject_1.GameObject {
  constructor() {
    super("GamePartnerManager");
    this.addObjectMember(0, new GameObject_1.GameMap());
    this.addObjectMember(1, new GameObject_1.GameObjectMap(GameGoods));
  }
  // 上阵情况记录
  get BattleRecord() { return (0, GameObject_1.meta_get)(this, 0); }
  set BattleRecord(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 伙伴集合
  get Partners() { return (0, GameObject_1.meta_get)(this, 1); }
  set Partners(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.GamePartnerManager = GamePartnerManager;
class GameSkillManager extends GameObject_1.GameObject {
  constructor() {
    super("GameSkillManager");
    this.addObjectMember(0, new GameObject_1.GameMap());
    this.addObjectMember(1, new GameObject_1.GameMap());
    this.addObjectMember(2, new GameObject_1.GameMap());
    this.addObjectMember(3, new GameObject_1.GameObjectMap(GameGoods));
    this.addObjectMember(4, new GameObject_1.GameObjectMap(GameGoods));
  }
  // 技能背包的技能上阵情况
  get WearSkillRecord() { return (0, GameObject_1.meta_get)(this, 0); }
  set WearSkillRecord(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 遗物的上阵情况
  get WearRamainsRecord() { return (0, GameObject_1.meta_get)(this, 1); }
  set WearRamainsRecord(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 宝物的上阵情况
  get WearTreasureRecord() { return (0, GameObject_1.meta_get)(this, 2); }
  set WearTreasureRecord(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 技能背包
  get Skills() { return (0, GameObject_1.meta_get)(this, 3); }
  set Skills(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 目前生效的技能包括 技能背包上阵的、遗物的被动技能、装备的史莱姆技能等，战斗系统直接取这个技能数据进行战斗
  get takeEffectSkills() { return (0, GameObject_1.meta_get)(this, 4); }
  set takeEffectSkills(value) { (0, GameObject_1.meta_set)(this, 4, value); }
}
exports.GameSkillManager = GameSkillManager;
class FightProps extends GameObject_1.GameObject {
  constructor() {
    super("FightProps");
    this.addObjectMember(20, new GameObject_1.GameObjectMap(SkillValue));
  }
  // UserId
  get PlayerUid() { return (0, GameObject_1.meta_get)(this, 0); }
  set PlayerUid(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // Unit_id
  get UnitSid() { return (0, GameObject_1.meta_get)(this, 1); }
  set UnitSid(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // Owner_Unit_id
  get OwnerId() { return (0, GameObject_1.meta_get)(this, 2); }
  set OwnerId(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // Unit_id
  get UnitId() { return (0, GameObject_1.meta_get)(this, 3); }
  set UnitId(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // Unit_id
  get AttackValue() { return (0, GameObject_1.meta_get)(this, 4); }
  set AttackValue(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 血量
  get Hp() { return (0, GameObject_1.meta_get)(this, 5); }
  set Hp(value) { (0, GameObject_1.meta_set)(this, 5, value); }
  // 血量上限
  get HpProp() { return (0, GameObject_1.meta_get)(this, 6); }
  set HpProp(value) { (0, GameObject_1.meta_set)(this, 6, value); }
  // 血量恢复
  get RecoverProp() { return (0, GameObject_1.meta_get)(this, 7); }
  set RecoverProp(value) { (0, GameObject_1.meta_set)(this, 7, value); }
  // 攻速
  get AttackSpeed() { return (0, GameObject_1.meta_get)(this, 8); }
  set AttackSpeed(value) { (0, GameObject_1.meta_set)(this, 8, value); }
  // 暴击率
  get CritProp() { return (0, GameObject_1.meta_get)(this, 9); }
  set CritProp(value) { (0, GameObject_1.meta_set)(this, 9, value); }
  // 暴击伤害
  get CritDmgProp() { return (0, GameObject_1.meta_get)(this, 10); }
  set CritDmgProp(value) { (0, GameObject_1.meta_set)(this, 10, value); }
  // 连击
  get DoubleShotsProp() { return (0, GameObject_1.meta_get)(this, 11); }
  set DoubleShotsProp(value) { (0, GameObject_1.meta_set)(this, 11, value); }
  // 三连击
  get TripleShotsProp() { return (0, GameObject_1.meta_get)(this, 12); }
  set TripleShotsProp(value) { (0, GameObject_1.meta_set)(this, 12, value); }
  // 多连击
  get MultiShotsProp() { return (0, GameObject_1.meta_get)(this, 13); }
  set MultiShotsProp(value) { (0, GameObject_1.meta_set)(this, 13, value); }
  // 闪避率
  get MissProp() { return (0, GameObject_1.meta_get)(this, 14); }
  set MissProp(value) { (0, GameObject_1.meta_set)(this, 14, value); }
  // 技能增强
  get SkillAddon() { return (0, GameObject_1.meta_get)(this, 15); }
  set SkillAddon(value) { (0, GameObject_1.meta_set)(this, 15, value); }
  // Boss伤害增强
  get BossDmgProp() { return (0, GameObject_1.meta_get)(this, 16); }
  set BossDmgProp(value) { (0, GameObject_1.meta_set)(this, 16, value); }
  // Boss伤害增强
  get MoveSpeed() { return (0, GameObject_1.meta_get)(this, 17); }
  set MoveSpeed(value) { (0, GameObject_1.meta_set)(this, 17, value); }
  // Boss伤害增强
  get ControlFlag() { return (0, GameObject_1.meta_get)(this, 18); }
  set ControlFlag(value) { (0, GameObject_1.meta_set)(this, 18, value); }
  // 阵营
  get CorpId() { return (0, GameObject_1.meta_get)(this, 19); }
  set CorpId(value) { (0, GameObject_1.meta_set)(this, 19, value); }
  // 技能数值修正
  get SkillValueManager() { return (0, GameObject_1.meta_get)(this, 20); }
  set SkillValueManager(value) { (0, GameObject_1.meta_set)(this, 20, value); }
  // 技能CD
  get SkillCD() { return (0, GameObject_1.meta_get)(this, 21); }
  set SkillCD(value) { (0, GameObject_1.meta_set)(this, 21, value); }
}
exports.FightProps = FightProps;
class SkillValueManager extends GameObject_1.GameObject {
  constructor() {
    super("SkillValueManager");
  }
}
exports.SkillValueManager = SkillValueManager;
class SkillValue extends GameObject_1.GameObject {
  constructor() {
    super("SkillValue");
  }
  // 技能组ID
  get SkillGroupId() { return (0, GameObject_1.meta_get)(this, 0); }
  set SkillGroupId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // Value
  get ValueName() { return (0, GameObject_1.meta_get)(this, 1); }
  set ValueName(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // Value
  get Per() { return (0, GameObject_1.meta_get)(this, 2); }
  set Per(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // Value
  get Abs() { return (0, GameObject_1.meta_get)(this, 3); }
  set Abs(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.SkillValue = SkillValue;
class AttackBeginInfo extends GameObject_1.GameObject {
  constructor() {
    super("AttackBeginInfo");
  }
  // AttackId
  get AttackId() { return (0, GameObject_1.meta_get)(this, 0); }
  set AttackId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // Unit_id
  get SrcUnitId() { return (0, GameObject_1.meta_get)(this, 1); }
  set SrcUnitId(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // ParentId
  get ParentId() { return (0, GameObject_1.meta_get)(this, 2); }
  set ParentId(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // DestUnitId
  get DestUnitId() { return (0, GameObject_1.meta_get)(this, 3); }
  set DestUnitId(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // SkillSid
  get SkillSid() { return (0, GameObject_1.meta_get)(this, 4); }
  set SkillSid(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // ContextId
  get ContextId() { return (0, GameObject_1.meta_get)(this, 5); }
  set ContextId(value) { (0, GameObject_1.meta_set)(this, 5, value); }
}
exports.AttackBeginInfo = AttackBeginInfo;
class AttackDamageInfo extends GameObject_1.GameObject {
  constructor() {
    super("AttackDamageInfo");
  }
  // FightId
  get AttackId() { return (0, GameObject_1.meta_get)(this, 0); }
  set AttackId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // FightId
  get FightId() { return (0, GameObject_1.meta_get)(this, 1); }
  set FightId(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // SkillSid
  get StartTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set StartTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // AttackerId
  get AttackerId() { return (0, GameObject_1.meta_get)(this, 3); }
  set AttackerId(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // AttackerId
  get SkillSid() { return (0, GameObject_1.meta_get)(this, 4); }
  set SkillSid(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // ContextId
  get ContextId() { return (0, GameObject_1.meta_get)(this, 5); }
  set ContextId(value) { (0, GameObject_1.meta_set)(this, 5, value); }
  // TargetId
  get TargetId() { return (0, GameObject_1.meta_get)(this, 6); }
  set TargetId(value) { (0, GameObject_1.meta_set)(this, 6, value); }
  // TargetId
  get StageId() { return (0, GameObject_1.meta_get)(this, 7); }
  set StageId(value) { (0, GameObject_1.meta_set)(this, 7, value); }
  // TargetId
  get DamageSum() { return (0, GameObject_1.meta_get)(this, 8); }
  set DamageSum(value) { (0, GameObject_1.meta_set)(this, 8, value); }
  // TargetId
  get DamageResult() { return (0, GameObject_1.meta_get)(this, 9); }
  set DamageResult(value) { (0, GameObject_1.meta_set)(this, 9, value); }
  // AttackState
  get AttackState() { return (0, GameObject_1.meta_get)(this, 10); }
  set AttackState(value) { (0, GameObject_1.meta_set)(this, 10, value); }
}
exports.AttackDamageInfo = AttackDamageInfo;
class FieldBeginInfo extends GameObject_1.GameObject {
  constructor() {
    super("FieldBeginInfo");
    this.addObjectMember(2, new GameObject_1.GameObjectMap(FightProps));
  }
  // AttackId
  get FightId() { return (0, GameObject_1.meta_get)(this, 0); }
  set FightId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // SkillSid
  get StartTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set StartTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // Props
  get FightProps() { return (0, GameObject_1.meta_get)(this, 2); }
  set FightProps(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // SkillSid
  get RandomSeed() { return (0, GameObject_1.meta_get)(this, 3); }
  set RandomSeed(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.FieldBeginInfo = FieldBeginInfo;
class FieldEndInfo extends GameObject_1.GameObject {
  constructor() {
    super("FieldEndInfo");
  }
  // AttackId
  get FightId() { return (0, GameObject_1.meta_get)(this, 0); }
  set FightId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // AttackId
  get EndTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set EndTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.FieldEndInfo = FieldEndInfo;
class UnitDeadInfo extends GameObject_1.GameObject {
  constructor() {
    super("UnitDeadInfo");
  }
  // AttackId
  get UnitId() { return (0, GameObject_1.meta_get)(this, 0); }
  set UnitId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
}
exports.UnitDeadInfo = UnitDeadInfo;
class UpgradeInfo extends GameObject_1.GameObject {
  constructor() {
    super("UpgradeInfo");
  }
  // UnitId
  get UnitId() { return (0, GameObject_1.meta_get)(this, 0); }
  set UnitId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // PlayerUid
  get PlayerUid() { return (0, GameObject_1.meta_get)(this, 1); }
  set PlayerUid(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // PropName
  get PropName() { return (0, GameObject_1.meta_get)(this, 2); }
  set PropName(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // PropValue
  get PropValue() { return (0, GameObject_1.meta_get)(this, 3); }
  set PropValue(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // PropValue
  get UpgradeIndex() { return (0, GameObject_1.meta_get)(this, 4); }
  set UpgradeIndex(value) { (0, GameObject_1.meta_set)(this, 4, value); }
}
exports.UpgradeInfo = UpgradeInfo;
class RecoverHpInfo extends GameObject_1.GameObject {
  constructor() {
    super("RecoverHpInfo");
  }
  // AttackId
  get UnitId() { return (0, GameObject_1.meta_get)(this, 0); }
  set UnitId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // AttackId
  get HpValue() { return (0, GameObject_1.meta_get)(this, 1); }
  set HpValue(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.RecoverHpInfo = RecoverHpInfo;
class LoginReward extends GameObject_1.GameObject {
  constructor() {
    super("LoginReward");
  }
  // 登录天数
  get LoginDays() { return (0, GameObject_1.meta_get)(this, 0); }
  set LoginDays(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 领取状态 0-不可领取 1-可领取 2-已领取 其他非法
  get State() { return (0, GameObject_1.meta_get)(this, 1); }
  set State(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.LoginReward = LoginReward;
class LoginRewardRecord extends GameObject_1.GameObject {
  constructor() {
    super("LoginRewardRecord");
    this.addObjectMember(0, new GameObject_1.GameObjectMap(LoginReward));
  }
  // 奖励记录
  get Record() { return (0, GameObject_1.meta_get)(this, 0); }
  set Record(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 最近一次获取奖励时间
  get LastGetRewardTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set LastGetRewardTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.LoginRewardRecord = LoginRewardRecord;
class GamePlayer extends GameObject_1.GameObject {
  constructor() {
    super("GamePlayer");
    this.addObjectMember(4, new GamePlayerProp());
    this.addObjectMember(5, new GamePlayerProp());
    this.addObjectMember(6, new GamePlayerProp());
    this.addObjectMember(7, new GamePlayerProp());
    this.addObjectMember(8, new GamePlayerProp());
    this.addObjectMember(9, new GamePlayerProp());
    this.addObjectMember(10, new GamePlayerProp());
    this.addObjectMember(11, new GamePlayerProp());
    this.addObjectMember(12, new GamePlayerProp());
    this.addObjectMember(13, new GamePlayerProp());
    this.addObjectMember(14, new GamePlayerProp());
    this.addObjectMember(15, new GamePlayerProp());
    this.addObjectMember(16, new GamePlayerProp());
    this.addObjectMember(17, new GamePlayerProp());
    this.addObjectMember(18, new GamePlayerProp());
    this.addObjectMember(19, new GamePlayerProp());
    this.addObjectMember(20, new GamePlayerProp());
    this.addObjectMember(21, new GamePlayerProp());
    this.addObjectMember(22, new GamePlayerProp());
    this.addObjectMember(23, new GameObject_1.GameObjectMap(GameItem));
    this.addObjectMember(24, new GameObject_1.GameObjectMap(GameSlime));
    this.addObjectMember(25, new GameMineManager());
    this.addObjectMember(29, new GameObject_1.GameObjectMap(GameSimpleTask));
    this.addObjectMember(30, new GameEquipManager());
    this.addObjectMember(31, new GamePartnerManager());
    this.addObjectMember(32, new GameSkillManager());
    this.addObjectMember(33, new GameObject_1.GameObjectMap(GameDrawCard));
    this.addObjectMember(35, new GameADSManager());
    this.addObjectMember(36, new TimeItem());
    this.addObjectMember(37, new HookReward());
    this.addObjectMember(38, new DungeonManager());
    this.addObjectMember(39, new GameResearchManager());
    this.addObjectMember(40, new GameBlessManager());
    this.addObjectMember(41, new GameFlyBoxManager());
    this.addObjectMember(42, new LoginRewardRecord());
    this.addObjectMember(43, new GameMailManager());
    this.addObjectMember(44, new TaskCountItem());
    this.addObjectMember(45, new GuideManager());
    this.addObjectMember(46, new SevenTaskManager());
  }
  // UserId
  get PlayerUid() { return (0, GameObject_1.meta_get)(this, 0); }
  set PlayerUid(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // UserId
  get RandomSeed() { return (0, GameObject_1.meta_get)(this, 1); }
  set RandomSeed(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 账号
  get AccountUid() { return (0, GameObject_1.meta_get)(this, 2); }
  set AccountUid(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 用户名称
  get UserName() { return (0, GameObject_1.meta_get)(this, 3); }
  set UserName(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 移动速度
  get MoveSpeedProp() { return (0, GameObject_1.meta_get)(this, 4); }
  set MoveSpeedProp(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 闪避概率
  get MissProp() { return (0, GameObject_1.meta_get)(this, 5); }
  set MissProp(value) { (0, GameObject_1.meta_set)(this, 5, value); }
  // 基础生命百分比
  get HpProp() { return (0, GameObject_1.meta_get)(this, 6); }
  set HpProp(value) { (0, GameObject_1.meta_set)(this, 6, value); }
  // 攻击
  get AttackProp() { return (0, GameObject_1.meta_get)(this, 7); }
  set AttackProp(value) { (0, GameObject_1.meta_set)(this, 7, value); }
  // 基础血量
  get RecoverProp() { return (0, GameObject_1.meta_get)(this, 8); }
  set RecoverProp(value) { (0, GameObject_1.meta_set)(this, 8, value); }
  // 攻击速度
  get AttackSpeedProp() { return (0, GameObject_1.meta_get)(this, 9); }
  set AttackSpeedProp(value) { (0, GameObject_1.meta_set)(this, 9, value); }
  // 暴击属性
  get CritProp() { return (0, GameObject_1.meta_get)(this, 10); }
  set CritProp(value) { (0, GameObject_1.meta_set)(this, 10, value); }
  // 暴击伤害属性
  get CritDmgProp() { return (0, GameObject_1.meta_get)(this, 11); }
  set CritDmgProp(value) { (0, GameObject_1.meta_set)(this, 11, value); }
  // 二连射
  get DoubleShotsProp() { return (0, GameObject_1.meta_get)(this, 12); }
  set DoubleShotsProp(value) { (0, GameObject_1.meta_set)(this, 12, value); }
  // 三连射
  get TripleShotsProp() { return (0, GameObject_1.meta_get)(this, 13); }
  set TripleShotsProp(value) { (0, GameObject_1.meta_set)(this, 13, value); }
  // 金币获取加成
  get CoinAdditionProp() { return (0, GameObject_1.meta_get)(this, 14); }
  set CoinAdditionProp(value) { (0, GameObject_1.meta_set)(this, 14, value); }
  // 伙伴伤害量加成
  get PartnerDmgProp() { return (0, GameObject_1.meta_get)(this, 15); }
  set PartnerDmgProp(value) { (0, GameObject_1.meta_set)(this, 15, value); }
  // 伙伴攻速加成
  get PartnerAtkSpeedProp() { return (0, GameObject_1.meta_get)(this, 16); }
  set PartnerAtkSpeedProp(value) { (0, GameObject_1.meta_set)(this, 16, value); }
  // 技能cd减少
  get SkillCDProp() { return (0, GameObject_1.meta_get)(this, 17); }
  set SkillCDProp(value) { (0, GameObject_1.meta_set)(this, 17, value); }
  // boss伤害量加成
  get BossDmgProp() { return (0, GameObject_1.meta_get)(this, 18); }
  set BossDmgProp(value) { (0, GameObject_1.meta_set)(this, 18, value); }
  // 镐头获取速度
  get PickGetProp() { return (0, GameObject_1.meta_get)(this, 19); }
  set PickGetProp(value) { (0, GameObject_1.meta_set)(this, 19, value); }
  // 矿石获取量
  get MineStoreProp() { return (0, GameObject_1.meta_get)(this, 20); }
  set MineStoreProp(value) { (0, GameObject_1.meta_set)(this, 20, value); }
  // 矿山科技研究速度
  get MineSpeedProp() { return (0, GameObject_1.meta_get)(this, 21); }
  set MineSpeedProp(value) { (0, GameObject_1.meta_set)(this, 21, value); }
  // 额外放置奖励
  get ExpendRewardProp() { return (0, GameObject_1.meta_get)(this, 22); }
  set ExpendRewardProp(value) { (0, GameObject_1.meta_set)(this, 22, value); }
  // 背包
  get BagManager() { return (0, GameObject_1.meta_get)(this, 23); }
  set BagManager(value) { (0, GameObject_1.meta_set)(this, 23, value); }
  // 史莱姆角色管理器
  get SlimeManager() { return (0, GameObject_1.meta_get)(this, 24); }
  set SlimeManager(value) { (0, GameObject_1.meta_set)(this, 24, value); }
  // 采矿
  get MineManager() { return (0, GameObject_1.meta_get)(this, 25); }
  set MineManager(value) { (0, GameObject_1.meta_set)(this, 25, value); }
  // 当前关卡等级
  get CurProgress() { return (0, GameObject_1.meta_get)(this, 26); }
  set CurProgress(value) { (0, GameObject_1.meta_set)(this, 26, value); }
  // 当前关卡等循环标志
  get CurProgressLoop() { return (0, GameObject_1.meta_get)(this, 27); }
  set CurProgressLoop(value) { (0, GameObject_1.meta_set)(this, 27, value); }
  // 当前通过的最大关卡等级
  get MaxProgress() { return (0, GameObject_1.meta_get)(this, 28); }
  set MaxProgress(value) { (0, GameObject_1.meta_set)(this, 28, value); }
  // 任务
  get GameSimpleTaskManager() { return (0, GameObject_1.meta_get)(this, 29); }
  set GameSimpleTaskManager(value) { (0, GameObject_1.meta_set)(this, 29, value); }
  // 装备背包
  get EquipManager() { return (0, GameObject_1.meta_get)(this, 30); }
  set EquipManager(value) { (0, GameObject_1.meta_set)(this, 30, value); }
  // 伙伴背包
  get PartnerManager() { return (0, GameObject_1.meta_get)(this, 31); }
  set PartnerManager(value) { (0, GameObject_1.meta_set)(this, 31, value); }
  // 技能背包
  get SkillManager() { return (0, GameObject_1.meta_get)(this, 32); }
  set SkillManager(value) { (0, GameObject_1.meta_set)(this, 32, value); }
  // 抽卡数据
  get DrawManager() { return (0, GameObject_1.meta_get)(this, 33); }
  set DrawManager(value) { (0, GameObject_1.meta_set)(this, 33, value); }
  // Token_Key
  get Token() { return (0, GameObject_1.meta_get)(this, 34); }
  set Token(value) { (0, GameObject_1.meta_set)(this, 34, value); }
  // 广告
  get ADSManager() { return (0, GameObject_1.meta_get)(this, 35); }
  set ADSManager(value) { (0, GameObject_1.meta_set)(this, 35, value); }
  // 记录时间
  get timeManger() { return (0, GameObject_1.meta_get)(this, 36); }
  set timeManger(value) { (0, GameObject_1.meta_set)(this, 36, value); }
  // 挂机奖励
  get HookRewardManger() { return (0, GameObject_1.meta_get)(this, 37); }
  set HookRewardManger(value) { (0, GameObject_1.meta_set)(this, 37, value); }
  // 副本管理
  get DungeonMgr() { return (0, GameObject_1.meta_get)(this, 38); }
  set DungeonMgr(value) { (0, GameObject_1.meta_set)(this, 38, value); }
  // 研究
  get ResearchManager() { return (0, GameObject_1.meta_get)(this, 39); }
  set ResearchManager(value) { (0, GameObject_1.meta_set)(this, 39, value); }
  // 祝福管理器
  get BlessMgr() { return (0, GameObject_1.meta_get)(this, 40); }
  set BlessMgr(value) { (0, GameObject_1.meta_set)(this, 40, value); }
  // 飞舞的箱子
  get FlyBoxMgr() { return (0, GameObject_1.meta_get)(this, 41); }
  set FlyBoxMgr(value) { (0, GameObject_1.meta_set)(this, 41, value); }
  // 登录奖励记录
  get LoginRewardRecord() { return (0, GameObject_1.meta_get)(this, 42); }
  set LoginRewardRecord(value) { (0, GameObject_1.meta_set)(this, 42, value); }
  // 邮件
  get MailMgr() { return (0, GameObject_1.meta_get)(this, 43); }
  set MailMgr(value) { (0, GameObject_1.meta_set)(this, 43, value); }
  // 记录某个任务模块的总进度
  get TaskCountManger() { return (0, GameObject_1.meta_get)(this, 44); }
  set TaskCountManger(value) { (0, GameObject_1.meta_set)(this, 44, value); }
  // 新手引导的数据
  get GuideMgr() { return (0, GameObject_1.meta_get)(this, 45); }
  set GuideMgr(value) { (0, GameObject_1.meta_set)(this, 45, value); }
  // 七日任务
  get SevenTaskMgr() { return (0, GameObject_1.meta_get)(this, 46); }
  set SevenTaskMgr(value) { (0, GameObject_1.meta_set)(this, 46, value); }
}
exports.GamePlayer = GamePlayer;
class GameItemManager extends GameObject_1.GameObject {
  constructor() {
    super("GameItemManager");
  }
}
exports.GameItemManager = GameItemManager;
class GameItem extends GameObject_1.GameObject {
  constructor() {
    super("GameItem");
  }
  // 道具ID
  get ItemId() { return (0, GameObject_1.meta_get)(this, 0); }
  set ItemId(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 道具数量
  get Count() { return (0, GameObject_1.meta_get)(this, 1); }
  set Count(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 道具类型
  get ItemType() { return (0, GameObject_1.meta_get)(this, 2); }
  set ItemType(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameItem = GameItem;
class GameSlime extends GameObject_1.GameObject {
  constructor() {
    super("GameSlime");
  }
  // 史莱姆角色ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 史莱姆当前等级
  get Level() { return (0, GameObject_1.meta_get)(this, 1); }
  set Level(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 史莱姆当前经验
  get Exp() { return (0, GameObject_1.meta_get)(this, 2); }
  set Exp(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 史莱姆上阵状态
  get isBattle() { return (0, GameObject_1.meta_get)(this, 3); }
  set isBattle(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.GameSlime = GameSlime;
class GamePlayerProp extends GameObject_1.GameObject {
  constructor() {
    super("GamePlayerProp");
    this.addObjectMember(3, new GameObject_1.GameMap());
  }
  // 基础abs属性值
  get BaseVal() { return (0, GameObject_1.meta_get)(this, 0); }
  set BaseVal(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 具体值
  get Value() { return (0, GameObject_1.meta_get)(this, 1); }
  set Value(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 等级
  get Level() { return (0, GameObject_1.meta_get)(this, 2); }
  set Level(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 12乘区
  get MultiArea() { return (0, GameObject_1.meta_get)(this, 3); }
  set MultiArea(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.GamePlayerProp = GamePlayerProp;
class TimeItem extends GameObject_1.GameObject {
  constructor() {
    super("TimeItem");
  }
  // 每日任务重置时间
  get dailyTaskResetTime() { return (0, GameObject_1.meta_get)(this, 0); }
  set dailyTaskResetTime(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 最近一次离线时间
  get LastOfflineTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set LastOfflineTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 最近一次登陆时间
  get LastLoginTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set LastLoginTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 玩家创建时间
  get CreateTime() { return (0, GameObject_1.meta_get)(this, 3); }
  set CreateTime(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.TimeItem = TimeItem;
class HookReward extends GameObject_1.GameObject {
  constructor() {
    super("HookReward");
    this.addObjectMember(0, new GameObject_1.GameObjectMap(GameItem));
    this.addObjectMember(1, new GameObject_1.GameObjectMap(HookItem));
  }
  // 奖励
  get rewards() { return (0, GameObject_1.meta_get)(this, 0); }
  set rewards(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 奖励时间
  get HookItems() { return (0, GameObject_1.meta_get)(this, 1); }
  set HookItems(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 金币领取时间
  get GoldGetRewardTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set GoldGetRewardTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.HookReward = HookReward;
class HookItem extends GameObject_1.GameObject {
  constructor() {
    super("HookItem");
  }
  // 折算奖励的时间
  get GetRewardTime() { return (0, GameObject_1.meta_get)(this, 0); }
  set GetRewardTime(value) { (0, GameObject_1.meta_set)(this, 0, value); }
}
exports.HookItem = HookItem;
class DungeonManager extends GameObject_1.GameObject {
  constructor() {
    super("DungeonManager");
    this.addObjectMember(1, new GameObject_1.GameMap());
  }
  // 刷新时间
  get RefreshTime() { return (0, GameObject_1.meta_get)(this, 0); }
  set RefreshTime(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 各个副本挑战等级
  get Records() { return (0, GameObject_1.meta_get)(this, 1); }
  set Records(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.DungeonManager = DungeonManager;
class GameFlyBoxManager extends GameObject_1.GameObject {
  constructor() {
    super("GameFlyBoxManager");
  }
  // ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 宝箱过期时间
  get BoxExpireTime() { return (0, GameObject_1.meta_get)(this, 1); }
  set BoxExpireTime(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 技能持续时间
  get ExpireTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set ExpireTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 真实技能ID
  get SkillId() { return (0, GameObject_1.meta_get)(this, 3); }
  set SkillId(value) { (0, GameObject_1.meta_set)(this, 3, value); }
}
exports.GameFlyBoxManager = GameFlyBoxManager;
class GameMailManager extends GameObject_1.GameObject {
  constructor() {
    super("GameMailManager");
    this.addObjectMember(1, new GameObject_1.GameMap());
    this.addObjectMember(2, new GameObject_1.GameObjectMap(GameMail));
  }
  // 邮件计数器
  get counter() { return (0, GameObject_1.meta_get)(this, 0); }
  set counter(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 系统邮件状态
  get SystemMailState() { return (0, GameObject_1.meta_get)(this, 1); }
  set SystemMailState(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 邮件数据
  get Mails() { return (0, GameObject_1.meta_get)(this, 2); }
  set Mails(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.GameMailManager = GameMailManager;
class GameMail extends GameObject_1.GameObject {
  constructor() {
    super("GameMail");
    this.addObjectMember(4, new GameObject_1.GameObjectMap(GameItem));
  }
  // 邮件ID
  get MailID() { return (0, GameObject_1.meta_get)(this, 0); }
  set MailID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 邮件描述
  get MailDes() { return (0, GameObject_1.meta_get)(this, 1); }
  set MailDes(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 过期时间
  get ExpireTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set ExpireTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
  // 获取方式
  get Model() { return (0, GameObject_1.meta_get)(this, 3); }
  set Model(value) { (0, GameObject_1.meta_set)(this, 3, value); }
  // 邮件奖励
  get MailRewards() { return (0, GameObject_1.meta_get)(this, 4); }
  set MailRewards(value) { (0, GameObject_1.meta_set)(this, 4, value); }
  // 是否打开过
  get IsSee() { return (0, GameObject_1.meta_get)(this, 5); }
  set IsSee(value) { (0, GameObject_1.meta_set)(this, 5, value); }
  // 邮件来源
  get Source() { return (0, GameObject_1.meta_get)(this, 6); }
  set Source(value) { (0, GameObject_1.meta_set)(this, 6, value); }
}
exports.GameMail = GameMail;
class GuideManager extends GameObject_1.GameObject {
  constructor() {
    super("GuideManager");
  }
  // ID
  get ID() { return (0, GameObject_1.meta_get)(this, 0); }
  set ID(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 客户端上传的数据服务器不用
  get Data() { return (0, GameObject_1.meta_get)(this, 1); }
  set Data(value) { (0, GameObject_1.meta_set)(this, 1, value); }
}
exports.GuideManager = GuideManager;
class SevenTaskManager extends GameObject_1.GameObject {
  constructor() {
    super("SevenTaskManager");
    this.addObjectMember(1, new GameObject_1.GameMap());
  }
  // 完成奖励的数量
  get Count() { return (0, GameObject_1.meta_get)(this, 0); }
  set Count(value) { (0, GameObject_1.meta_set)(this, 0, value); }
  // 奖励领取状态
  get Status() { return (0, GameObject_1.meta_get)(this, 1); }
  set Status(value) { (0, GameObject_1.meta_set)(this, 1, value); }
  // 七日任务解锁时间
  get SevenTaskUnLockTime() { return (0, GameObject_1.meta_get)(this, 2); }
  set SevenTaskUnLockTime(value) { (0, GameObject_1.meta_set)(this, 2, value); }
}
exports.SevenTaskManager = SevenTaskManager;
(0, GameObject_1.registerProp)("GameADSManager", GameADSManager, "LastADSTime", "bigint", null);
(0, GameObject_1.registerProp)("GameADSManager", GameADSManager, "ADSInfos", "ADSInfo", ADSInfo, 1);
(0, GameObject_1.registerProp)("ADSInfo", ADSInfo, "ADSType", "int", null);
(0, GameObject_1.registerProp)("ADSInfo", ADSInfo, "Times", "int", null);
(0, GameObject_1.registerProp)("ADSInfo", ADSInfo, "DayTimes", "int", null);
(0, GameObject_1.registerProp)("ADSInfo", ADSInfo, "LastTime", "bigint", null);
(0, GameObject_1.registerProp)("GameDrawCard", GameDrawCard, "level", "number", null);
(0, GameObject_1.registerProp)("GameDrawCard", GameDrawCard, "exp", "number", null);
(0, GameObject_1.registerProp)("GameDrawCard", GameDrawCard, "drawCardCount", "number", null);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "Deep", "int", null);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "DeepEnd", "int", null);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "LastRefreshTime", "int", null);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "NextRefreshLeft", "int", null);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "Items", "MineItem", MineItem, 1);
(0, GameObject_1.registerProp)("GameMineManager", GameMineManager, "Molds", "MineMold", MineMold, 1);
(0, GameObject_1.registerProp)("MineMold", MineMold, "moldId", "int", null);
(0, GameObject_1.registerProp)("MineMold", MineMold, "Y", "int", null);
(0, GameObject_1.registerProp)("MineMold", MineMold, "X", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "Y", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "X", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "SlotType", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "OreType", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "HP", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "BoxId", "int", null);
(0, GameObject_1.registerProp)("MineItem", MineItem, "Bright", "int", null);
(0, GameObject_1.registerProp)("MineReward", MineReward, "ItemId", "int", null);
(0, GameObject_1.registerProp)("MineReward", MineReward, "Count", "bigint", null);
(0, GameObject_1.registerProp)("GameResearchManager", GameResearchManager, "CurResearchNodeId", "int", null);
(0, GameObject_1.registerProp)("GameResearchManager", GameResearchManager, "CurResearchEndTime", "bigint", null);
(0, GameObject_1.registerProp)("GameResearchManager", GameResearchManager, "UnlockedNodes", "ResearchNode", ResearchNode, 1);
(0, GameObject_1.registerProp)("ResearchNode", ResearchNode, "NodeId", "int", null);
(0, GameObject_1.registerProp)("ResearchNode", ResearchNode, "Stage", "int", null);
(0, GameObject_1.registerProp)("ResearchNode", ResearchNode, "State", "int", null);
(0, GameObject_1.registerProp)("GameSimpleTask", GameSimpleTask, "ID", "int", null);
(0, GameObject_1.registerProp)("GameSimpleTask", GameSimpleTask, "count", "int", null);
(0, GameObject_1.registerProp)("GameSimpleTask", GameSimpleTask, "getReward", "int", null);
(0, GameObject_1.registerProp)("GameSimpleTask", GameSimpleTask, "finishCount", "int", null);
(0, GameObject_1.registerProp)("GameSimpleTask", GameSimpleTask, "finishTime", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "MineResearch", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "SlmLevel", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "DestroyMineBox", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "WatchAdSum", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "FlyBoxSum", "int", null);
(0, GameObject_1.registerProp)("TaskCountItem", TaskCountItem, "BlessSum", "int", null);
(0, GameObject_1.registerProp)("GameBlessItem", GameBlessItem, "ID", "int", null);
(0, GameObject_1.registerProp)("GameBlessItem", GameBlessItem, "Level", "int", null);
(0, GameObject_1.registerProp)("GameBlessItem", GameBlessItem, "Exp", "int", null);
(0, GameObject_1.registerProp)("GameBlessItem", GameBlessItem, "IsAuto", "int", null);
(0, GameObject_1.registerProp)("GameBlessItem", GameBlessItem, "ExpireTime", "int", null);
(0, GameObject_1.registerProp)("GameBlessManager", GameBlessManager, "Vip", "GameGoods", GameGoods, 0);
(0, GameObject_1.registerProp)("GameBlessManager", GameBlessManager, "CurrBless", "GameBlessItem", GameBlessItem, 1);
(0, GameObject_1.registerProp)("UnitItem", UnitItem, "ID", "int", null);
(0, GameObject_1.registerProp)("UnitItem", UnitItem, "Level", "int", null);
(0, GameObject_1.registerProp)("UnitItem", UnitItem, "LevelNeed", "int", null);
(0, GameObject_1.registerProp)("Unit", Unit, "UnitName", "string", null);
(0, GameObject_1.registerProp)("Unit", Unit, "UnitLevel", "int", null);
(0, GameObject_1.registerProp)("Unit", Unit, "UnitItems", "UnitItem", UnitItem, 1);
(0, GameObject_1.registerProp)("Unit", Unit, "UnitState", "byte", null);
(0, GameObject_1.registerProp)("GameCollectionManager", GameCollectionManager, "EquipUnits", "Unit", Unit, 1);
(0, GameObject_1.registerProp)("GameCollectionManager", GameCollectionManager, "SkillUnits", "Unit", Unit, 1);
(0, GameObject_1.registerProp)("GameCollectionManager", GameCollectionManager, "PartnerUnits", "Unit", Unit, 1);
(0, GameObject_1.registerProp)("GameGoods", GameGoods, "ID", "int", null);
(0, GameObject_1.registerProp)("GameGoods", GameGoods, "Level", "int", null);
(0, GameObject_1.registerProp)("GameGoods", GameGoods, "Count", "int", null);
(0, GameObject_1.registerProp)("GameEquipManager", GameEquipManager, "WeaponPos", "int", null);
(0, GameObject_1.registerProp)("GameEquipManager", GameEquipManager, "ArmorPos", "int", null);
(0, GameObject_1.registerProp)("GameEquipManager", GameEquipManager, "Equips", "GameGoods", GameGoods, 1);
(0, GameObject_1.registerProp)("GamePartnerManager", GamePartnerManager, "BattleRecord", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("GamePartnerManager", GamePartnerManager, "Partners", "GameGoods", GameGoods, 1);
(0, GameObject_1.registerProp)("GameSkillManager", GameSkillManager, "WearSkillRecord", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("GameSkillManager", GameSkillManager, "WearRamainsRecord", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("GameSkillManager", GameSkillManager, "WearTreasureRecord", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("GameSkillManager", GameSkillManager, "Skills", "GameGoods", GameGoods, 1);
(0, GameObject_1.registerProp)("GameSkillManager", GameSkillManager, "takeEffectSkills", "GameGoods", GameGoods, 1);
(0, GameObject_1.registerProp)("FightProps", FightProps, "PlayerUid", "bigint", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "UnitSid", "int", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "OwnerId", "int", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "UnitId", "int", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "AttackValue", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "Hp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "HpProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "RecoverProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "AttackSpeed", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "CritProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "CritDmgProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "DoubleShotsProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "TripleShotsProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "MultiShotsProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "MissProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "SkillAddon", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "BossDmgProp", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "MoveSpeed", "double", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "ControlFlag", "bigint", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "CorpId", "int", null);
(0, GameObject_1.registerProp)("FightProps", FightProps, "SkillValueManager", "SkillValue", SkillValue, 1);
(0, GameObject_1.registerProp)("FightProps", FightProps, "SkillCD", "double", null);
(0, GameObject_1.registerProp)("SkillValue", SkillValue, "SkillGroupId", "int", null);
(0, GameObject_1.registerProp)("SkillValue", SkillValue, "ValueName", "int", null);
(0, GameObject_1.registerProp)("SkillValue", SkillValue, "Per", "double", null);
(0, GameObject_1.registerProp)("SkillValue", SkillValue, "Abs", "double", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "AttackId", "int", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "SrcUnitId", "int", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "ParentId", "int", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "DestUnitId", "int", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "SkillSid", "int", null);
(0, GameObject_1.registerProp)("AttackBeginInfo", AttackBeginInfo, "ContextId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "AttackId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "FightId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "StartTime", "StartTime", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "AttackerId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "SkillSid", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "ContextId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "TargetId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "StageId", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "DamageSum", "double", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "DamageResult", "int", null);
(0, GameObject_1.registerProp)("AttackDamageInfo", AttackDamageInfo, "AttackState", "int", null);
(0, GameObject_1.registerProp)("FieldBeginInfo", FieldBeginInfo, "FightId", "int", null);
(0, GameObject_1.registerProp)("FieldBeginInfo", FieldBeginInfo, "StartTime", "", null);
(0, GameObject_1.registerProp)("FieldBeginInfo", FieldBeginInfo, "FightProps", "FightProps", FightProps, 1);
(0, GameObject_1.registerProp)("FieldBeginInfo", FieldBeginInfo, "RandomSeed", "uint", null);
(0, GameObject_1.registerProp)("FieldEndInfo", FieldEndInfo, "FightId", "int", null);
(0, GameObject_1.registerProp)("FieldEndInfo", FieldEndInfo, "EndTime", "bigint", null);
(0, GameObject_1.registerProp)("UnitDeadInfo", UnitDeadInfo, "UnitId", "int", null);
(0, GameObject_1.registerProp)("UpgradeInfo", UpgradeInfo, "UnitId", "int", null);
(0, GameObject_1.registerProp)("UpgradeInfo", UpgradeInfo, "PlayerUid", "double", null);
(0, GameObject_1.registerProp)("UpgradeInfo", UpgradeInfo, "PropName", "string", null);
(0, GameObject_1.registerProp)("UpgradeInfo", UpgradeInfo, "PropValue", "double", null);
(0, GameObject_1.registerProp)("UpgradeInfo", UpgradeInfo, "UpgradeIndex", "int", null);
(0, GameObject_1.registerProp)("RecoverHpInfo", RecoverHpInfo, "UnitId", "int", null);
(0, GameObject_1.registerProp)("RecoverHpInfo", RecoverHpInfo, "HpValue", "double", null);
(0, GameObject_1.registerProp)("LoginReward", LoginReward, "LoginDays", "short", null);
(0, GameObject_1.registerProp)("LoginReward", LoginReward, "State", "byte", null);
(0, GameObject_1.registerProp)("LoginRewardRecord", LoginRewardRecord, "Record", "LoginReward", LoginReward, 1);
(0, GameObject_1.registerProp)("LoginRewardRecord", LoginRewardRecord, "LastGetRewardTime", "long", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "PlayerUid", "bigint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "RandomSeed", "uint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "AccountUid", "bigint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "UserName", "string", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MoveSpeedProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MissProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "HpProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "AttackProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "RecoverProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "AttackSpeedProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "CritProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "CritDmgProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "DoubleShotsProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "TripleShotsProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "CoinAdditionProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "PartnerDmgProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "PartnerAtkSpeedProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "SkillCDProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "BossDmgProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "PickGetProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MineStoreProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MineSpeedProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "ExpendRewardProp", "GamePlayerProp", GamePlayerProp, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "BagManager", "GameItem", GameItem, 1);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "SlimeManager", "GameSlime", GameSlime, 1);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MineManager", "GameMineManager", GameMineManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "CurProgress", "uint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "CurProgressLoop", "uint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MaxProgress", "uint", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "GameSimpleTaskManager", "GameSimpleTask", GameSimpleTask, 1);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "EquipManager", "GameEquipManager", GameEquipManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "PartnerManager", "GamePartnerManager", GamePartnerManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "SkillManager", "GameSkillManager", GameSkillManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "DrawManager", "GameDrawCard", GameDrawCard, 1);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "Token", "string", null);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "ADSManager", "GameADSManager", GameADSManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "timeManger", "TimeItem", TimeItem, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "HookRewardManger", "HookReward", HookReward, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "DungeonMgr", "DungeonManager", DungeonManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "ResearchManager", "GameResearchManager", GameResearchManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "BlessMgr", "GameBlessManager", GameBlessManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "FlyBoxMgr", "GameFlyBoxManager", GameFlyBoxManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "LoginRewardRecord", "LoginRewardRecord", LoginRewardRecord, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "MailMgr", "GameMailManager", GameMailManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "TaskCountManger", "TaskCountItem", TaskCountItem, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "GuideMgr", "GuideManager", GuideManager, 0);
(0, GameObject_1.registerProp)("GamePlayer", GamePlayer, "SevenTaskMgr", "SevenTaskManager", SevenTaskManager, 0);
(0, GameObject_1.registerProp)("GameItem", GameItem, "ItemId", "int", null);
(0, GameObject_1.registerProp)("GameItem", GameItem, "Count", "bigint", null);
(0, GameObject_1.registerProp)("GameItem", GameItem, "ItemType", "int", null);
(0, GameObject_1.registerProp)("GameSlime", GameSlime, "ID", "int", null);
(0, GameObject_1.registerProp)("GameSlime", GameSlime, "Level", "int", null);
(0, GameObject_1.registerProp)("GameSlime", GameSlime, "Exp", "int", null);
(0, GameObject_1.registerProp)("GameSlime", GameSlime, "isBattle", "int", null);
(0, GameObject_1.registerProp)("GamePlayerProp", GamePlayerProp, "BaseVal", "double", null);
(0, GameObject_1.registerProp)("GamePlayerProp", GamePlayerProp, "Value", "double", null);
(0, GameObject_1.registerProp)("GamePlayerProp", GamePlayerProp, "Level", "int", null);
(0, GameObject_1.registerProp)("GamePlayerProp", GamePlayerProp, "MultiArea", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("TimeItem", TimeItem, "dailyTaskResetTime", "int", null);
(0, GameObject_1.registerProp)("TimeItem", TimeItem, "LastOfflineTime", "int", null);
(0, GameObject_1.registerProp)("TimeItem", TimeItem, "LastLoginTime", "int", null);
(0, GameObject_1.registerProp)("TimeItem", TimeItem, "CreateTime", "int", null);
(0, GameObject_1.registerProp)("HookReward", HookReward, "rewards", "GameItem", GameItem, 1);
(0, GameObject_1.registerProp)("HookReward", HookReward, "HookItems", "HookItem", null, 1);
(0, GameObject_1.registerProp)("HookReward", HookReward, "GoldGetRewardTime", "int", null);
(0, GameObject_1.registerProp)("HookItem", HookItem, "GetRewardTime", "int", null);
(0, GameObject_1.registerProp)("DungeonManager", DungeonManager, "RefreshTime", "int", null);
(0, GameObject_1.registerProp)("DungeonManager", DungeonManager, "Records", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("GameFlyBoxManager", GameFlyBoxManager, "ID", "int", null);
(0, GameObject_1.registerProp)("GameFlyBoxManager", GameFlyBoxManager, "BoxExpireTime", "int", null);
(0, GameObject_1.registerProp)("GameFlyBoxManager", GameFlyBoxManager, "ExpireTime", "int", null);
(0, GameObject_1.registerProp)("GameFlyBoxManager", GameFlyBoxManager, "SkillId", "int", null);
(0, GameObject_1.registerProp)("GameMailManager", GameMailManager, "counter", "int", null);
(0, GameObject_1.registerProp)("GameMailManager", GameMailManager, "SystemMailState", "number", null, 0);
(0, GameObject_1.registerProp)("GameMailManager", GameMailManager, "Mails", "GameMail", null, 1);
(0, GameObject_1.registerProp)("GameMail", GameMail, "MailID", "number", null);
(0, GameObject_1.registerProp)("GameMail", GameMail, "MailDes", "string", null);
(0, GameObject_1.registerProp)("GameMail", GameMail, "ExpireTime", "number", null);
(0, GameObject_1.registerProp)("GameMail", GameMail, "Model", "number", null);
(0, GameObject_1.registerProp)("GameMail", GameMail, "MailRewards", "GameItem", null, 1);
(0, GameObject_1.registerProp)("GameMail", GameMail, "IsSee", "number", null);
(0, GameObject_1.registerProp)("GameMail", GameMail, "Source", "string", null);
(0, GameObject_1.registerProp)("GuideManager", GuideManager, "ID", "number", null);
(0, GameObject_1.registerProp)("GuideManager", GuideManager, "Data", "string", null);
(0, GameObject_1.registerProp)("SevenTaskManager", SevenTaskManager, "Count", "int", null);
(0, GameObject_1.registerProp)("SevenTaskManager", SevenTaskManager, "Status", "GameMap", GameObject_1.GameMap, 0);
(0, GameObject_1.registerProp)("SevenTaskManager", SevenTaskManager, "SevenTaskUnLockTime", "int", null);
// # sourceMappingURL=GameEntity.js.map
