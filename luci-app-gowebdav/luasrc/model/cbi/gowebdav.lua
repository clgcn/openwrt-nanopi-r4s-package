-- Created By [CTCGFW]Project-OpenWrt
-- https://github.com/project-openwrt

local m, s, o

m = Map("gowebdav", translate("GoWebDav"), translate("GoWebDav is a tiny, simple, fast WebDav server."))

m:section(SimpleSection).template  = "gowebdav/gowebdav_status"

s = m:section(TypedSection, "config")
s.anonymous = true
s.addremove = false

o = s:option(Flag, "enable", translate("Enable"))
o.rmempty = false

o = s:option(Value, "listen_port", translate("Listen Port"))
o.placeholder = 6086
o.default     = 6086
o.datatype    = "port"
o.rmempty     = false

o = s:option(Value, "username", translate("Username"))
o.description = translate("Leave blank to disable auth.")
o.rmempty     = true

o = s:option(Value, "password", translate("Password"))
o.description = translate("Leave blank to disable auth.")
o.password    = true
o.rmempty     = true

o = s:option(Value, "root_dir", translate("Root Directory"))
o.placeholder = "/mnt"
o.default     = "/mnt"
o.rmempty     = false

o = s:option(Flag, "read_only", translate("Read-only mode"))
o.rmempty     = false

o = s:option(Flag, "allow_wan", translate("Allow Access From Internet"))
o.rmempty     = false

o = s:option(Flag, "use_https", translate("Use HTTPS"))
o.rmempty     = false

o = s:option(Value, "cert_cer", translate("Certificate (*.cer)"))
o:depends("use_https", "1")
o.rmempty     = true

o = s:option(Value, "cert_key", translate("Certificate Key (*.key)"))
o:depends("use_https", "1")
o.rmempty     = true

return m