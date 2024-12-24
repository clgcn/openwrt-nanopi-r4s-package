include $(TOPDIR)/rules.mk

PKG_NAME:=gowebdav
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

# Remove PKG_SOURCE_PROTO, PKG_SOURCE_URL, and PKG_SOURCE_VERSION
# PKG_SOURCE_PROTO:=git
# PKG_SOURCE_URL:=https://github.com/your-repo/gowebdav.git
# PKG_SOURCE_VERSION:=main

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk

define Package/gowebdav
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Go WebDAV Server
  DEPENDS:=+golang
endef

define Package/gowebdav/description
  A simple WebDAV server written in Go.
endef

define Build/Prepare
  $(call Build/Prepare/Default)
  mkdir -p $(PKG_BUILD_DIR)/src
  $(CP) ./src/* $(PKG_BUILD_DIR)/src/
endef

define Build/Compile
  mkdir -p $(PKG_BUILD_DIR)/bin
  cd $(PKG_BUILD_DIR)/src && \
  go build -o $(PKG_BUILD_DIR)/bin/gowebdav gowebdav.go
endef

define Package/gowebdav/install
  $(INSTALL_DIR) $(1)/usr/bin
  $(INSTALL_BIN) $(PKG_BUILD_DIR)/bin/gowebdav $(1)/usr/bin/gowebdav
endef

$(eval $(call BuildPackage,gowebdav))