(function($){
	$.fn.jwonder = function(options) {
		options = $.extend({
			color: "#000000",
			shadow: "#000000",
			aChannel: "0.8"
		}, options);
		return this.each(function () {
			var self = $(this);
			self.title = self.attr("title");
			self.image = self.children("img:eq(0)");
			self.way = self.image.attr("src");
			self.link = function () {
				if (self.attr("href")) {
					var link = self.attr("href");
				} else {
					var link = "127.0.0.1";
					return link;
				}

				var link = self.attr("href");
				if (link.substring(0,8) == "https://") {
					return link.substring(8);
				} else if (link.substring(0,7) == "http://") {

					return link.substring(7);
				} else if (link.substring(0,1) == "/") {
					return location.href.split("/")[2]+link;
				} else {
					return location.href+link;
				}
			};
			self.width = function () {
				self.image.css({
					"width":"auto",
					"height":"auto",
					"max-width":"100%",
					"max-height":"100%",
					"min-width":"0",
					"min-height":"0"
				});
				return self.image.width()+8;
			};
			self.bg = function (elem) {
				var background = "background-color: "+elem+";";
				    background += " background-color: rgba("+self.convertRGB(elem)+", "+options.aChannel+");";
				    background += "$background-color: "+elem+";";
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
			if (self.link() == "127.0.0.1") {
				var linkBrowser = '';
			} else {
				var linkBrowser = 'href="http://'+self.link()+'"';
			}
			browser = '<div class="jwonder" style="max-width:'+self.width()+'px;'+self.bg(options.color)+self.shadow()+'"><div class="top"><span class="site">'+self.title+'</span><a class="adr" '+linkBrowser+'><span>http://</span>'+self.link()+'</a></div><a  class="inner" '+linkBrowser+'><img title="'+self.title+'" alt="'+self.title+'" src="'+self.way+'" /></a><div class="bottom"></div></div>';
			self.after(browser).remove();
		});
	};
})(jQuery);
