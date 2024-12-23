module("luci.controller.webdav", package.seeall)

function index()
    if not nixio.fs.access("/etc/config/webdav") then
        return
    end

    entry({"admin", "services", "webdav"}, cbi("webdav"), _("WebDAV Server"), 10).dependent = true
    entry({"admin", "services", "webdav", "status"}, template("webdav/webdav_status"), _("Status"), 20).leaf = true
    entry({"admin", "services", "webdav", "link"}, template("webdav/webdav_link"), _("WebDAV Link"), 30).leaf = true
end