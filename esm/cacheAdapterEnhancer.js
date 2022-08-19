/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-10-12
 */
import { __awaiter, __generator } from "tslib";
import LRUCache from 'lru-cache';
import buildSortedURL from './utils/buildSortedURL';
import isCacheLike from './utils/isCacheLike';
var FIVE_MINUTES = 1000 * 60 * 5;
var CAPACITY = 100;
export default function cacheAdapterEnhancer(adapter, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = options.enabledByDefault, enabledByDefault = _a === void 0 ? true : _a, _b = options.cacheFlag, cacheFlag = _b === void 0 ? 'cache' : _b, _c = options.defaultCache, defaultCache = _c === void 0 ? new LRUCache({ maxAge: FIVE_MINUTES, max: CAPACITY }) : _c;
    return function (config) {
        var url = config.url, method = config.method, params = config.params, paramsSerializer = config.paramsSerializer, forceUpdate = config.forceUpdate;
        var useCache = (config[cacheFlag] !== void 0 && config[cacheFlag] !== null)
            ? config[cacheFlag]
            : enabledByDefault;
        if (method === 'get' && useCache) {
            // if had provide a specified cache, then use it instead
            var cache_1 = isCacheLike(useCache) ? useCache : defaultCache;
            // build the index according to the url and params
            var index_1 = buildSortedURL(url, params, paramsSerializer);
            var responsePromise = cache_1.get(index_1);
            if (!responsePromise || forceUpdate) {
                responsePromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                    var reason_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, adapter(config)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                reason_1 = _a.sent();
                                cache_1.del(index_1);
                                throw reason_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
                // put the promise for the non-transformed response into cache as a placeholder
                cache_1.set(index_1, responsePromise);
                return responsePromise;
            }
            /* istanbul ignore next */
            if (process && process.env.LOGGER_LEVEL === 'info') {
                // eslint-disable-next-line no-console
                console.info("[axios-extensions] request cached by cache adapter --> url: ".concat(index_1));
            }
            return responsePromise;
        }
        return adapter(config);
    };
}
//# sourceMappingURL=cacheAdapterEnhancer.js.map