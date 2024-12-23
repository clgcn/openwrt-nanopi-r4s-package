m = Map("webdav", translate("WebDAV Server"))

s = m:section(TypedSection, "webdav", translate("Settings"))
s.addremove = false
s.anonymous = true

s:option(Flag, "enabled", translate("Enable"))

o = s:option(Value, "dir", translate("Root Directory"))
o.datatype = "directory"

o = s:option(Value, "port", translate("Port"))
o.datatype = "port"

o = s:option(Flag, "https_mode", translate("Use HTTPS"))

o = s:option(Value, "https_cert_file", translate("HTTPS Certificate File"))
o:depends("https_mode", 1)

o = s:option(Value, "https_key_file", translate("HTTPS Key File"))
o:depends("https_mode", 1)

o = s:option(Value, "user", translate("Username"))

o = s:option(Value, "password", translate("Password"))
o.password = true

o = s:option(Flag, "read_only", translate("Read Only"))

o = s:option(Flag, "show_hidden", translate("Show Hidden Files"))

return m