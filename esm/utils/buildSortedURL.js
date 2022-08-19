/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-10-12
 */
// @ts-ignore
import buildURL from 'axios/lib/helpers/buildURL';
export default function buildSortedURL() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var builtURL = buildURL.apply(void 0, args);
    var _a = builtURL.split('?'), urlPath = _a[0], queryString = _a[1];
    if (queryString) {
        var paramsPair = queryString.split('&');
        return "".concat(urlPath, "?").concat(paramsPair.sort().join('&'));
    }
    return builtURL;
}
//# sourceMappingURL=buildSortedURL.js.map