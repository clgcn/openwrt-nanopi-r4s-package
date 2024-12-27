#
# Copyright (C) 2021 ImmortalWrt
# <https://immortalwrt.org>
#
# This is free software, licensed under the GNU General Public License v3.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=gowebdav
PKG_VERSION:=0.0.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/clgcn/gowebdav/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=060531dc439a303351399d29f632583db026b3da34c334691e0b34ddd103a09f

PKG_CONFIG_DEPENDS:= \
	CONFIG_GOWEBDAV_COMPRESS_GOPROXY \
	CONFIG_GOWEBDAV_COMPRESS_UPX

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_USE_MIPS16:=0

GO_PKG:=github.com/clgcn/gowebdav
GO_PKG_LDFLAGS:=-s -w

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

define Package/gowebdav
	SECTION:=net
	CATEGORY:=Network
	SUBMENU:=File Transfer
	TITLE:=A simple WebDav server written in Golang.
	URL:=https://github.com/clgcn/gowebdav
	DEPENDS:=$(GO_ARCH_DEPENDS)
endef

define Package/gowebdav/description
	A simple WebDav server written in Golang.
endef

define Package/gowebdav/config
config GOWEBDAV_COMPRESS_GOPROXY
	bool "Compiling with GOPROXY proxy"
	default n

config GOWEBDAV_COMPRESS_UPX
	bool "Compress executable files with UPX"
	default n 
endef

ifeq ($(CONFIG_GOWEBDAV_COMPRESS_GOPROXY),y)
	export GO111MODULE=on
	export GOPROXY=https://goproxy.io
endif

define Build/Compile
	$(call GoPackage/Build/Compile)
ifeq ($(CONFIG_GOWEBDAV_COMPRESS_UPX),y)
	$(STAGING_DIR_HOST)/bin/upx --lzma --best $(GO_PKG_BUILD_BIN_DIR)/gowebdav
endif
endef

define Package/gowebdav/install
	$(call GoPackage/Package/Install/Bin,$(PKG_INSTALL_DIR))

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/gowebdav $(1)/usr/bin/gowebdav

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) $(CURDIR)/files/gowebdav.config $(1)/etc/config/gowebdav
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(CURDIR)/files/gowebdav.init $(1)/etc/init.d/gowebdav
endef

$(eval $(call GoBinPackage,gowebdav))
$(eval $(call BuildPackage,gowebdav))