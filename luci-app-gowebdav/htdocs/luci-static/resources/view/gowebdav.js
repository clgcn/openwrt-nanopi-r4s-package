'use strict';
'require form';
'require poll';
'require rpc';
'require uci';
'require view';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: ['name'],
	expect: { '': {} }
});

function getServiceStatus() {
	return L.resolveDefault(callServiceList('gowebdav'), {}).then(function (res) {
		var isRunning = false;
		try {
			isRunning = res['gowebdav']['instances']['instance1']['running'];
		} catch (e) { }
		return isRunning;
	});
}

function renderStatus(isRunning, webport) {
	var spanTemp = '<em><span style="color:%s"><strong>%s %s</strong></span></em>';
	var renderHTML;
	if (isRunning) {
		var button = String.format('<input class="cbi-button-reload" type="button" style="margin-left: 50px" value="%s" onclick="window.open(\'//%s:%s/\')">',
			_('Open Web Interface'), window.location.hostname, webport);
		renderHTML = spanTemp.format('green', _('gowebdav'), _('RUNNING')) + button;
	} else {
		renderHTML = spanTemp.format('red', _('gowebdav'), _('NOT RUNNING'));
	}

	return renderHTML;
}

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('gowebdav')
		]);
	},

	render: function(data) {
		var m, s, o;
		var webport = uci.get(data[0], 'config', 'listen_port') || '6086';

		m = new form.Map('gowebdav', _('gowebdav'),
			_('GoWebDav is a tiny, simple, fast WebDav server.'));

		s = m.section(form.TypedSection);
		s.anonymous = true;
		s.render = function () {
			poll.add(function () {
				return L.resolveDefault(getServiceStatus()).then(function (res) {
					var view = document.getElementById('service_status');
					view.innerHTML = renderStatus(res, webport);
				});
			});

			return E('div', { class: 'cbi-section', id: 'status_bar' }, [
					E('p', { id: 'service_status' }, _('Collecting data...'))
			]);
		}

		s = m.section(form.NamedSection, 'config', 'gowebdav');

		o = s.option(form.Flag, 'enable', _('Enable'));
		o.default = o.disabled;
		o.rmempty = false;

		o = s.option(form.Value, 'listen_port', _('WebUI Listen port'));
		o.datatype = 'port';
		o.default = '6086';
		o.rmempty = false;

		o = s.option(form.Value, 'root_dir', _('Root directory'));
		o.default = '/mnt';
		o.rmempty = false;

		o = s.option(form.Flag, 'read_only', _('Read only'));
		o.default = o.disabled;
		o.rmempty = true;

		o = s.option(form.Flag, 'allow_wan', _('Allow WAN'));
		o.default = o.disabled;
		o.rmempty = true;

		o = s.option(form.Value, 'username', _('Username'));
		o.rmempty = true;

		o = s.option(form.Value, 'password', _('Password'));
		o.password = true;
		o.rmempty = true;

		o = s.option(form.Flag, 'use_https', _('Use HTTPS'));
		o.default = o.disabled;
		o.rmempty = true;

		o = s.option(form.Value, 'cert_cer', _('Cert cer'));
		o.rmempty = true;
		o.datatype = 'file';
		o.depends('use_https', 1);

		o = s.option(form.Value, 'cert_key', _('Cert key'));
		o.rmempty = true;
		o.datatype = 'file';
		o.depends('use_https', 1);

		o = s.option(DummyValue,"opennewwindow",translate("<input type=\"button\" class=\"cbi-button cbi-button-apply\" value=\"Download Reg File\" onclick=\"window.open('https://raw.githubusercontent.com/1715173329/gowebdav/master/allow_http.reg')\" />"))
		o.description = translate("Windows doesn't allow HTTP auth by default, you need to import this reg key to enable it (Reboot needed).")

		return m.render();
	}
});
