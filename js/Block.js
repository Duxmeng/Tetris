(function(){
	window.Block = function(){
		// 创建一个方块
		// 罗列方块所有的类型
		var allType = ["I","J","L","T","O","S","Z"];
		// 要从所有的类型中随机出一个
		this.type = allType[parseInt(Math.random() * allType.length)];
		// 得到随机的类型的所有状态
		this.allDir = fangkuai[this.type].length;
		// 随机出某一种状态
		this.dir = parseInt(Math.random() * this.allDir);
		// 获取方块
		this.code = fangkuai[this.type][this.dir];
		// 初始行和列
		this.row = 0;
		this.col = 4;
	}
	Block.prototype.renderBlock = function(){
		// 渲染方块
		for(var i = 0; i < 4; i++){
			for(var j =0; j < 4; j++){
				// 如果方块的4行4列中有一个不是0，就说明有颜色，渲染这个颜色
				if(this.code[i][j] != 0){
					game.setColor(i+this.row,j+this.col,this.code[i][j])
				}
			}
		}
	}
	Block.prototype.check = function(row,col){
		for(var i = 0; i < 4; i++){
			for(var j = 0 ; j < 4; j ++){
				if(this.code[i][j] != 0 && game.map.mapCode[row +i][col + j] != 0){
					return false;
				}
			}
		}
		// 跳出循环就说明方块和地图中没有重合的位置
		return true;
	}
	Block.prototype.checkDown = function(){
		if(this.check(this.row+1,this.col)){
			this.row++;
		}else{
			// 渲染到地图上
			this.sizaiditushang()
			// 判断是否能删除
			game.map.remove()
			// 当方块能下落的时候，产生新的方块
			game.block = new Block();
			// 判断死亡如果地图的最顶部的一行有颜色，就说明死亡
			for(var i = 0; i < 12; i++){
				if(game.map.mapCode[0][i] != 0){
					alert("游戏结束，您的分数为"+game.score)
					clearInterval(game.timer)
				}
			}

		}
	}
	Block.prototype.checkLeft = function(){
		if(this.check(this.row,this.col-1)){
			this.col--;
		}
	}
	Block.prototype.checkRight = function(){
		if(this.check(this.row,this.col+1)){
			this.col++;
		}
	}
	Block.prototype.checkDaodi = function(){
		while(this.check(this.row+1,this.col)){
			this.row++;
		}
	}
	Block.prototype.checkRot = function(){
		// 备份旧的方向
		var oldDir = this.dir
		console.log(this.dir)
		this.dir ++;
		if(this.dir > this.allDir - 1){
			this.dir = 0;
		}
		this.code = fangkuai[this.type][this.dir]
		console.log(this.dir)
		// 判断旋转之后的方块是否地图有重合，如果有，打回原形
		if(!this.check(this.row,this.col)){
			// 将新的方向变回旧的方向
			this.dir = oldDir;
			// 再渲染旧的方向
			this.code = fangkuai[this.type][this.dir]
		}
	}
	Block.prototype.sizaiditushang = function(){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(this.code[i][j] != 0){
					// 地图渲染方块
					game.map.mapCode[i+this.row][j+this.col] = this.code[i][j]
				}
			}
		}
	}
})()