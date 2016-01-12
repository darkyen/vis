cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-power/power.js",
        "id": "cordova-plugin-chrome-apps-power.power",
        "pluginId": "cordova-plugin-chrome-apps-power",
        "clobbers": [
            "chrome.power"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "id": "cordova-plugin-chrome-apps-common.events",
        "pluginId": "cordova-plugin-chrome-apps-common",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "id": "cordova-plugin-chrome-apps-common.errors",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "id": "cordova-plugin-chrome-apps-common.stubs",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "id": "cordova-plugin-chrome-apps-common.helpers",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcp/sockets.tcp.js",
        "id": "cordova-plugin-chrome-apps-sockets-tcp.sockets.tcp",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcp",
        "clobbers": [
            "chrome.sockets.tcp"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcpserver/sockets.tcpServer.js",
        "id": "cordova-plugin-chrome-apps-sockets-tcpserver.sockets.tcpServer",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcpserver",
        "clobbers": [
            "chrome.sockets.tcpServer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-sockets-udp/sockets.udp.js",
        "id": "cordova-plugin-chrome-apps-sockets-udp.sockets.udp",
        "pluginId": "cordova-plugin-chrome-apps-sockets-udp",
        "clobbers": [
            "chrome.sockets.udp"
        ]
    },
    {
        "file": "plugins/cordova-zeroconf-plugin/www/ZeroConf.js",
        "id": "cordova-zeroconf-plugin.zeroconf",
        "pluginId": "cordova-zeroconf-plugin",
        "clobbers": [
            "ZeroConf"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.0",
    "cordova-plugin-chrome-apps-power": "1.0.5-dev",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-sockets-tcp": "1.3.5-dev",
    "cordova-plugin-chrome-apps-sockets-tcpserver": "1.2.4-dev",
    "cordova-plugin-chrome-apps-sockets-udp": "1.2.3-dev",
    "cordova-zeroconf-plugin": "1.2.0"
}
// BOTTOM OF METADATA
});