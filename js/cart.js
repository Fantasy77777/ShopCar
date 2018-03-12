var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false
		// title:"Hello Vue!",
		// username:"JackSion",
		// msg:"我会跟着文本框的内容变化,不信你试试哦",
		// msg1:"这是一个结合了Vue.js+gulp+Browsersync的项目，请多指教",
		// msg2:"你好，gulp+browserSync，初次见面，余生请指教"
	},
	filters:{
		 formatMony:function(value){
			return "￥"+value.toFixed(2);
		}
		
	},
	mounted:function() {
		  this.$nextTick(function () {
    	// Code that will run only after the
    	// entire view has been rendered
    	this.cartView();
  		})
    			
	},
	methods:{
		cartView:function(){
			// var _this = this;
			// this.$http.get("data/cartData.json",{"id":123}).then(function(res){
			// 	_this.productList=res.body.result.list;
			// 	_this.totalMoney = res.body.result.totalMoney;
			// });	
			let _this = this;  //ES6的写法
			this.$http.get("data/cartData.json",{"id":123}).then(res=>{
				this.productList=res.body.result.list;
				// this.totalMoney = res.body.result.totalMoney;
			});
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<0){
					product.productQuantity = 0;
				}
			}
			this.calcTotalMoney();
		},
		selectedProduct:function(item){
			if(typeof item.checked == 'undefined'){
				Vue.set(item,"checked",true);
			}else{
				item.checked = !item.checked;
			}
			for(var i =0;i<this.productList.length;i++){
				if(this.productList[i].checked){
					this.checkAllFlag = true;
				}else{
					this.checkAllFlag = false;
					break;
				}
			}
			this.calcTotalMoney();
		},
		checkAll:function(){
			this.checkAllFlag = !this.checkAllFlag;
			var _this = this;
			this.productList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){
					Vue.set(item,"checked",_this.checkAllFlag);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});	
			this.calcTotalMoney();
		},
		calcTotalMoney:function(){
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney += item.productPrice*item.productQuantity;
				}
			});	
		}
	}
});