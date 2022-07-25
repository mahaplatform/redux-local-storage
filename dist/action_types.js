"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LOCAL_SET: function() {
        return LOCAL_SET;
    },
    LOCAL_GET: function() {
        return LOCAL_GET;
    },
    LOCAL_REMOVE: function() {
        return LOCAL_REMOVE;
    }
});
var LOCAL_SET = "LOCAL_SET";
var LOCAL_GET = "LOCAL_GET";
var LOCAL_REMOVE = "LOCAL_REMOVE";
