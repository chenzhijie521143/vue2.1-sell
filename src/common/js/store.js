/** 新增&&修改本地缓存
 *  @param string id 唯一id
 *  @param string key 标示
 *  @param string value 新增&修改的值
 */
export function saveToLocal(id, key, value) {
	// {"123":{"favorite":true},"123456":{"favorite":true}}
	let seller = window.localStorage.__seller__;
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	// localStroage 保存 字符串
	window.localStorage.__seller__ = JSON.stringify(seller);
};

/** 查询本地缓存
 *  @param string id 唯一id
 *  @param string key 标示
 *  @param string def 如果查询不到显示的值  例如：false
 */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key]; // 本例中为 true\false 
	return ret || def;
};