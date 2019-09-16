(function(){
	window.Game = function(){
		this.init()
		// 实例方块
		this.block = new Block();
		// 实例地图
		this.map = new Map()
		// 定时器，主循环体
		this.start()
		// 键盘监听
		this.bindEvent()
		// 分数
		this.score = 0;
	}
	Game.prototype.init = function(){
		// 表格初始化出来，上树
		for(var i = 0; i < 20; i++){
			var $tr = $("<tr></tr>");
			for(var j = 0; j < 12; j++){
				var $td = $("<td></td>");
				$td.appendTo($tr)
			}
			$tr.appendTo("table")
		}
	}
	Game.prototype.setColor = function(row,col,color){
		$("tr").eq(row).children("td").eq(col).addClass("c"+color)
	}
	Game.prototype.clear = function(){
		// 清除画布上所有的颜色
		for(var i = 0; i < 20; i++){
			for(var j = 0 ;j < 12; j++){
				$("tr").eq(i).children("td").eq(j).removeClass()
			}
		}
	}
	// 键盘监听
	Game.prototype.bindEvent = function(){
		var self = this;
		$(document).keydown(function(e){
			// 37左、38上、39右、40下
			if(e.keyCode == 37){
				self.block.checkLeft()
			}else if(e.keyCode == 39){
				self.block.checkRight()
			}else if(e.keyCode == 32){
				self.block.checkDaodi()
			}else if(e.keyCode == 38){
				self.block.checkRot()
			}
		})
	}
	Game.prototype.start = function(){
		// 备份this
		var self = this;
		this.timer = setInterval(function(){
			// 游戏套路-清屏-更新-渲染
			// 清屏
			self.clear()
			// 渲染
			self.block.checkDown()
			self.block.renderBlock()
			self.map.renderMap()
			
		},500)
	}
	
})()