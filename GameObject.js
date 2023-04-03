"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameObjectProp = exports.markDirtyCall = exports.register_updater = exports.register_map_hander = exports.register_handler = exports.handleDirtys = exports.SetValue = exports.setRawValue = exports.getRawValue = exports.clearDirty = exports.markDirty = exports.GameMap = exports.GameObjectMap = exports.GameObject = exports.registerProp = exports.meta_get = exports.meta_set = exports.GameProperty = exports.MetaDirtys = void 0;
class MetaDirtys {
  constructor() {
    this._parent_key = null;
    this._dirty_mark = {};
  }
}
exports.MetaDirtys = MetaDirtys;
class GameProperty {
  constructor() {
    this._prop_index = 0;
    this._prop_name = "";
    this._prop_type = "";
    this._map_mode = 0; // 0: 普通值， 1:map， 2:GameObject
    this._meta_class = null;
    this._sub_meta_class = null;
  }
}
exports.GameProperty = GameProperty;

var __k_updater = {};
var __prop_defines = {};
var __prop_indexes = {};
var __prop_defaults = {};
function meta_set(object, idx, value) {
  // let meta_clas = object.prototype;
  var old_val = object.__base_[idx];
  object.__base_[idx] = value;
  if (value != null && typeof (value) === 'object') {
    // value._dirtys._parent = object;
    value._dirtys._parent_key = idx;
    value._dirtys._dirty_mark = {};
  }
  markDirtyCall(object, idx, old_val, value);
}
exports.meta_set = meta_set;
function meta_get(object, idx) {
  if (!object) { return null; }
  if (!object._name || !__prop_defines[object._name]) { return object[idx]; }
  const prop = __prop_defines[object._name];
  if (prop.__updaters && prop[idx] && prop[idx]._prop_name && prop.__updaters[prop[idx]._prop_name]) { return prop.__updaters[prop[idx]._prop_name](object, idx); }
  return object.__base_[idx];
}
exports.meta_get = meta_get;
function registerProp(name, mt_object, prop_name, prop_type, mt_obj = null, map_mode = 0) {
  //   let meta_class = mt_object.__proto__;
  if (__prop_defines[name] == null) {
    __prop_defines[name] = [];
  }
  if (__prop_indexes[name] == null) {
    __prop_indexes[name] = {};
  }
  const prop = new GameProperty();
  prop._prop_name = prop_name;
  prop._prop_type = prop_type;
  prop._prop_index = __prop_defines[name].length;
  prop._map_mode = map_mode;
  if (mt_obj != null) {
    prop._meta_class = mt_obj;
  }
  __prop_defines[name].push(prop);
  __prop_indexes[name][prop_name] = prop._prop_index;
}
exports.registerProp = registerProp;
class GameObject {
  constructor(name) {
    this.__base_ = {};
    this.__old_base_ = {};
    this._dirtys = new MetaDirtys();
    this._name = name;
  }
  addObjectMember(key, obj) {
    if (!obj && typeof (obj) !== 'object' && !obj._dirtys) { return; }
    // obj._dirtys._parent = this;
    obj._dirtys._parent_key = key;
    obj._dirtys._dirty_mark = {};
    this.__base_[key] = obj;
  }
  setParent(parent, key) {
    // this._dirtys._parent = parent;
    this._dirtys._parent_key = key;
  }
  MsgReadFromBuffer(values, clear_dirty = false) {
    for (const idx in values) {
      // console.log('==============================', idx, this._name);
      var prop_def = __prop_defines[this._name][idx];
      var prop = this.__base_[idx];
      if (prop_def && !prop) {
        this.__base_[idx] = values[idx];
        if (!clear_dirty) { markDirty(this, idx); }
        continue;
      }
      if (prop_def._meta_class != null || prop_def._map_mode > 0) {
        prop.MsgReadFromBuffer(values[idx], clear_dirty);
      } else {
        this.__old_base_[idx] = this.__base_[idx];
        this.__base_[idx] = values[idx];
        if (!clear_dirty) { markDirty(this, idx); }
      }
    }
  }
  MsgWriteAll(out) {
    if (!out) { out = Object.create(null); }
    if (!__prop_defines[this._name]) { return; }
    for (const idx in __prop_defines[this._name]) {
      var prop_def = __prop_defines[this._name][idx];
      var prop = this.__base_[idx];
      if (prop_def._meta_class || prop_def._map_mode > 0) {
        out[idx] = prop.MsgWriteAll(null);
      } else {
        out[idx] = prop !== null && prop !== void 0 ? prop : 0;
        // out[Number(idx)] = prop ?? 0;
      }
    }
    return out;
  }
  MsgHandleDirtyMark(out, clear_dirty = true) {
    if (!out) { out = Object.create(null); }
    if (!__prop_defines[this._name]) { return null; }
    for (const idx in this._dirtys._dirty_mark) {
      var prop_def = __prop_defines[this._name][idx];
      var prop = this.__base_[idx];
      if (prop_def._meta_class || prop_def._map_mode > 0) {
        prop.MsgHandleDirtyMark(out[idx], clear_dirty);
      } else {
        out[idx] = prop || 0;
      }
    }
    return out;
  }
}
exports.GameObject = GameObject;
class GameObjectMap extends GameObject {
  constructor(meta_class) {
    super("__map_");
    this._meta_class = meta_class;
  }
  MsgReadFromBuffer(values, clear_dirty = false) {
    for (const idx in values) {
      // var prop_def = (this as any).__prop_define[idx];
      // var prop = this.__base_[idx];
      if (typeof (this._meta_class) === 'string' || values[idx] == null || values == undefined || this._meta_class == null) {
        this.__old_base_[idx] = this.__base_[idx];
        this.__base_[idx] = values[idx];
        if (!clear_dirty) { markDirty(this, idx); }
      } else {
        if (!this.__base_[idx]) {
          this.__base_[idx] = new this._meta_class();
          this.__base_[idx].setParent(this, idx);
          if (!clear_dirty) { markDirty(this, idx); }
        }
        this.__base_[idx].MsgReadFromBuffer(values[idx], clear_dirty);
      }
    }
  }
  add(key, obj) {
    const old_val = this.__base_[key];
    this.__base_[key] = obj;
    if (obj != null && typeof (obj) === 'object' && this._meta_class && obj.__proto__ == this._meta_class.prototype) {
    //   obj._dirtys._parent = this;
      obj._dirtys._parent_key = key;
      obj._dirtys._dirty_mark = {};
    }
    if (obj == null && typeof (old_val) === 'object') {
      obj._dirtys._parent = null;
    }
    markDirtyCall(this, key, old_val, obj);
    // if (this._dirtys._parent != null && this._dirtys._parent_key != null && this._dirtys._parent.__proto__.__handlers && this._dirtys._parent.__proto__.__handlers[this._dirtys._parent_key]) {
    //     this._dirtys._parent.__proto__.__handlers[this._dirtys._parent_key](this, key, old_val, obj);
    // }
  }
  remove(key) { this.add(key, null); }
  get(key) { return this.__base_[key]; }
  keys() {
    return Object.keys(this.__base_);
  }
  has(key) {
    const values = this.values();
    return values.includes(key);
  }
  values() {
    const vl = [];
    for (const i in this.__base_) {
      vl.push(this.__base_[i]);
    }
    return vl;
  }
  MsgWriteAll(out) {
    if (!out) { out = Object.create(null); }
    // var prop_def = __prop_defines[this._name]
    for (const idx in this.__base_) {
      // [idx];
      var prop = this.__base_[idx];
      if (this._meta_class) {
        out[idx] = prop.MsgWriteAll(null);
      } else {
        out[Number(idx)] = prop;
      }
    }
    return out;
  }
  MsgHandleDirtyMark(out, clear_dirty = true) {
    if (!out) { out = Object.create(null); }
    for (const idx in this._dirtys._dirty_mark) {
      var prop = this.__base_[idx];
      if (this._meta_class) {
        out[idx] = this.MsgHandleDirtyMark(null);
      } else {
        out[Number(idx)] = prop;
      }
    }
    return out;
  }
}
exports.GameObjectMap = GameObjectMap;
class GameMap extends GameObjectMap {
  constructor() {
    super(null);
  }
}
exports.GameMap = GameMap;
function markDirty(parent, parent_key, mark = null) {
  if (mark == null) {
    mark = 7; // ----111
  }
  if (parent == null || parent._dirtys == null || parent_key == null) {
    return true;
  }
  if (parent._dirtys._dirty_mark[parent_key] != null) {
    // parent mark==111时，说明需要整个更新，子节点就不需要再设脏了
    if (parent._dirtys._dirty_mark[parent_key] >= 7) {
      return false;
    }
    if (mark >= parent._dirtys._dirty_mark[parent_key]) {
      parent._dirtys._dirty_mark[parent_key] = mark;
    } else {
      mark = parent._dirtys._dirty_mark[parent_key];
    }
  }
  if ((parent._dirtys._parent != null)) {
    if (markDirty(parent._dirtys._parent, parent._dirtys._parent_key, 1) == false) {
      return false;
    }
  }
  parent._dirtys._dirty_mark[parent_key] = mark;
  return true;
}
exports.markDirty = markDirty;
function clearDirty(obj, keep_save = false) {
  if (typeof (obj) !== 'object' || obj == null || obj._dirtys == null) {
    return;
  }
  for (const [key, value] of Object.entries(obj._dirtys._dirty_mark)) {
    if ((keep_save == true) && (value > 3)) {
      obj._dirtys._dirty_mark[key] = 3;
    } else {
      delete obj._dirtys._dirty_mark[key];
    }
    clearDirty(getRawValue(obj, key), keep_save);
  }
}
exports.clearDirty = clearDirty;
function getRawValue(obj, key) {
  if (!obj) { return null; }
  if (!obj._name || !__prop_defines[obj._name]) { return obj[key]; }
  return obj.__base_[key];
}
exports.getRawValue = getRawValue;
function setRawValue(object, key, value) {
  if (!object) { return; }
  if (!object._name || !__prop_defines[object._name]) { return object[key] = value; }
  return object.__base_[key] = value;
}
exports.setRawValue = setRawValue;
function SetValue(obj, key, value) {
  if (!obj || !key) {
    return;
  }
  if (!obj._name) {
    obj[key] = value;
    return;
  }
  const proto = __prop_defines[obj._name]; // obj.__proto__;
  if (!proto) { return null; }
  if (proto._map_mode == 1) {
    obj.add(key, value);
  } else {
    obj[key] = value;
  }
}
exports.SetValue = SetValue;
function handleMapDirtys(object) {
//   const parent = object._dirtys._parent;
  const parent_key = object._dirtys._parent_key;
  const proto = __prop_defines[parent._name][parent_key];
  if (proto._meta_class == null) { return; }
  for (const [kk, vv] of Object.entries(object._dirtys._dirty_mark)) {
    handleDirtys(object.__base_[kk]);
    if (proto.__handlers && proto.__handlers['__map_'] && (object.__old_base_[kk] !== object.__base_[kk])) { proto.__handlers['__map_'](object, kk, object.__old_base_[kk], object.__base_[kk]); }
  }
  clearDirty(object);
}
function handleDirtys(object) {
  if (!object || !object._dirtys || !object._dirtys._dirty_mark || !object._name) { return; }
  if (object._name == '__map_') {
    handleMapDirtys(object);
    return;
  }
  const proto = __prop_defines[object._name];
  if (!proto) { return; }
  for (const [kk, vv] of Object.entries(object._dirtys._dirty_mark)) {
    const def = proto[kk];
    if (vv == 7) {
      if (proto.__handlers && proto.__handlers[def._prop_name]) { proto.__handlers[def._prop_name](object, kk, object.__old_base_[kk], object.__base_[kk]); }
    } else {
      if (object.__base_[kk] == null) { return; } else {
        handleDirtys(object.__base_[kk]);
        if (proto.__handlers && proto.__handlers[def._prop_name]) { proto.__handlers[def._prop_name](object, kk, object.__old_base_[kk], object.__base_[kk]); }
      }
    }
  }
  clearDirty(object);
}
exports.handleDirtys = handleDirtys;
function register_handler(meta_class, key, func) {
  // console.log("register_handler!!!!!!!!!!!!!!");
  if (!__prop_defines[meta_class]) { __prop_defines[meta_class] = {}; }
  const proto = __prop_defines[meta_class];
  if (proto.__handlers == null) { proto.__handlers = {}; }
  proto.__handlers[key] = func;
}
exports.register_handler = register_handler;
function register_map_hander(parent_name, parent_key, func) {
  // console.log("register_handler_map!!!!!!!!!!!!!!");
  // if (!__prop_defines[parent_name])
  //    __prop_defines[parent_name] = {}
  const proto = __prop_defines[parent_name][parent_key];
  if (proto.__handlers == null) { proto.__handlers = {}; }
  proto.__handlers["__map_"] = func;
}
exports.register_map_hander = register_map_hander;
function register_updater(meta_class, key, func) {
  // console.log("register_updater!!!!!!!!!!!!!!");
  if (!__prop_defines[meta_class]) { __prop_defines[meta_class] = {}; }
  const proto = __prop_defines[meta_class];
  if (proto.__updaters == null) { proto.__updaters = {}; }
  proto.__updaters[key] = func;
}
exports.register_updater = register_updater;
function markDirtyCall(object, key, old_v, v) {
  // console.log("go in markDirtyCall");
  if (object._dirtys == null) { return; }
  if (old_v == v) { return; }
  markDirty(object, key);
}
exports.markDirtyCall = markDirtyCall;
function getGameObjectProp(parent, index) {
  if (!parent || !index) { return null; }
  const proto = __prop_defines[parent._name];
  if (!proto) { return null; }
  return proto[index];
}
exports.getGameObjectProp = getGameObjectProp;
// # sourceMappingURL=GameObject.js.map
