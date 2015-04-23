(function(){
	$.fn.scrollup = function(options){
		var defaults = {showcount:5,speed:1000,interval:3000},options = $.extend(defaults,options);
		return this.each(function(){
			var thisObj = $(this),intervalId = 0;
			var sObj = {
				_resetHtml:function(_t,_o){
					_t.wrap("<div class='scrollWrap'></div>");
					$(".scrollWrap").css({"height":parseInt(_o.showcount)*parseInt(_t.children().outerHeight())+"px","overflow":"hidden"});
				},
				_active:function(_t,_o){
					_t.stop(true,true).animate({marginTop:parseInt(-_t.children().height())+"px"},_o.speed,function(){
						$(this).css({"marginTop":0}).children(":first").appendTo(_t);
					});
				},
				_bind:function(_t,_o){
					var $t = this;
					intervalId = setInterval(function(){
						$t._active(_t,_o);
					},_o.interval);
					_t.hover(
						function(){
							clearInterval(intervalId);
						},
						function(){
							intervalId = setInterval(function(){
								$t._active(_t,_o);
							},_o.interval);
						}
					);
				},
				init:function(obj,opt){
					if(obj.children().length > opt.showcount){
						this._resetHtml(obj,opt);
						this._bind(obj,opt);
					}
				}			
			};
			sObj.init(thisObj,options);
		});
	};
})(jQuery);