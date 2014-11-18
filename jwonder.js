(function($){
	$.fn.jwonder = function(options) {
		options = $.extend({
			color: "#000000",
			shadow: "#000000",
			aChannel: "0.8",
			target: "_self"
		}, options);
		return this.each(function () {
			var self = $(this);
			self.title = self.attr("title");
			self.image = self.children("img:eq(0)");
			self.way = self.image.attr("src");
			self.size = {
				width: parseFloat(self.image.attr('width'), 10) + 8,
				height: self.image.attr('height')
			};
			self.link = function () {
				if (self.attr("href")) {
					var link = self.attr("href");
				} else {
					var link = "127.0.0.1";
				}

				if (link.substring(0,8) == "https://") {
					return {
						protocol: 'https://',
						link: link.substring(8)
					};
				} else if (link.substring(0,7) == "http://") {
					return {
						protocol: 'http://',
						link: link.substring(7)
					};
				} else if (link.substring(0,1) == "/") {
					return {
						protocol: 'http://',
						link: location.href.split("/")[2]+link
					};
				} else if(!(self.attr("href"))) {
					return {
						protocol: 'http://',
						link: link
					};
				} else {
					return {
						protocol: 'http://',
						link: location.href+link
					};
				}
			};
			self.bg = function (elem) {
				var background = "background-color: "+elem+";";
				    background += " background-color: rgba("+self.convertRGB(elem)+", "+options.aChannel+");";
				return background;
			};
			self.shadow = function (elem) {
				var shadow = "-webkit-box-shadow: 0 0 12px "+options.shadow+";";
				    shadow += "-moz-box-shadow: 0 0 12px "+options.shadow+";";
				    shadow += "box-shadow: 0 0 12px "+options.shadow+";";
				return shadow;
			};
			self.convertRGB = function (elem) {
				if (elem.charAt(0)=="#")
					return self.convertRGB(elem.substring(1,7));

				colorRGB = parseInt(elem.substring(0,2),16)+", ";
				colorRGB += parseInt(elem.substring(2,4),16)+", ";
				colorRGB += parseInt(elem.substring(4,6),16);
				return colorRGB;
			}
			if (self.link().link == "127.0.0.1") {
				var linkBrowser = '';
			} else {
				var linkBrowser = 'href="'+ self.link().protocol + self.link().link +'"';
			}
			browser = '<div class="jwonder" style="max-width:'+self.size.width+'px;'+self.bg(options.color)+self.shadow()+'"><div class="top">' +
			'<span class="site">'+self.title+'</span>' +
			'<a class="adr" '+linkBrowser+' target="' + options.target + '">' +
			'<span>' + self.link().protocol + '</span>'+self.link().link+'</a></div>' +
			'<a  class="inner" '+linkBrowser+' target="' + options.target + '">' +
			'<img title="'+self.title+'" alt="'+self.title+'" src="'+self.way+'" /></a><div class="bottom"></div></div>';

			self.after(browser).remove();
		});
	};
})(jQuery);
