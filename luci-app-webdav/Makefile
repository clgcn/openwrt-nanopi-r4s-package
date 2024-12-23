include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI Support for WebDAV Server
LUCI_DEPENDS:=+gowebdav +luci-compat
LUCI_PKGARCH:=all

PKG_NAME:=luci-app-webdav
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
	$(INSTALL_DATA) ./luasrc/controller/webdav.lua $(1)/usr/lib/lua/luci/controller/webdav.lua

	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/model/cbi
	$(INSTALL_DATA) ./luasrc/model/cbi/webdav.lua $(1)/usr/lib/lua/luci/model/cbi/webdav.lua

	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/webdav
	$(INSTALL_DATA) ./luasrc/view/webdav/webdav_status.htm $(1)/usr/lib/lua/luci/view/webdav/webdav_status.htm

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./root/etc/init.d/webdav $(1)/etc/init.d/webdav
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
$(eval $(call BuildPackage,$(PKG_NAME)))