<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" 
					  :class="{'current':currenIndex===index}"
					  @click="selectMenu(index,$event)"
				>
					<span class="text border-b-1px">
          	<span v-show="item.type>0" class="icon" :class="classMap[item.type]">
    	  	  </span>
    	  	  {{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-b-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	    <shopcart 
	    	:delivery-price="seller.deliveryPrice"
	    	:min-price="seller.minPrice"
	    >
	    </shopcart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from'../shopcart/shopcart.vue';
	const ERR_OK = 0; // 返回成功标志
	export default {
		data() {
			return {
				goods: [],
				listHeight: [], //保存分栏高度
				scrollY:0       //滚动高度
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		computed:{
			
			//比较scroll 和 右边分栏高度，返回index
			currenIndex(){    
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					//console.log(height1);
					//console.log(this.scrollY);
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
			this.$http.get('/api/goods').then(response => {
				if(response.data.errno === ERR_OK) {
					this.goods = response.data.data;
					this.$nextTick(() => {
						this.initScroll();
						this.calculateHeight();
					});
				} else {
					console.log('no data');
				}

			});
		},
		methods: {
			initScroll() {
				let menuWrapper = this.$refs.menuWrapper;
				let foodsWrapper = this.$refs.menuWrapper;
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click:true  // 首先要使点击有效，因为 better-scroll将默认事件都阻止了
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType:3
				});
				
				//监控scroll事件，获取滚动高度
				this.foodsScroll.on("scroll",(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				});
			},
			//将右边每个分栏的高度存进数组
			calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        
        this.listHeight.push(height);
        for(let i=0;i<foodList.length;i++){
        	let item =foodList[i];
        	height += item.clientHeight;
        	this.listHeight.push(height);
        }
        // console.log(this.listHeight);
			},
			selectMenu(index,$event){
				//判断是否为pc端，pc端则返回，不做click:true的设置，以免触发两次点击事件
				// better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
			  if(!event._constructed){
			  	return;
			  }
				// console.log(event);
				let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			  let el=foodList[index];
			  this.foodsScroll.scrollToElement(el,300);
			}
		},
		components:{
			shopcart
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../common/styles/mixin.scss";
	.goods {
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 47px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item {
				display: table;
				height: 54px;
				width: 56px;
				padding:0 12px;
				line-height: 14px;
				&.current{
					position:relative;
					z-index:10;
					margin-top:-1px;
					background:#fff;
					.text{
						@include border-1px-none();
						font-weight:bold;
					}
				}
				.text {
					display: table-cell;
					vertical-align: middle;
					@include border-b-1px(rgba(7, 17, 27, 0.1));
					width: 56px;
					font-size: 12px;
					.icon {
						display: inline-block;
						vertical-align: top;
						width: 12px;
						height: 12px;
						margin-right: 2px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease {
							@include bg-image("img/decrease_3");
						}
						&.discount {
							@include bg-image("img/discount_3");
						}
						&.guarantee {
							@include bg-image("img/guarantee_3");
						}
						&.invoice {
							@include bg-image("img/invoice_3");
						}
						&.special {
							@include bg-image("img/special_3");
						}
					}
				}
			}
		}
		.foods-wrapper {
			flex: 1;
			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background: #f3f5f7;
			}
			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				@include border-b-1px(rgba(7, 17, 27, 0.1));
				&:last-child {
					@include border-1px-none();
					padding-bottom: 0;
				}
				.icon {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex: 1;
					.name {
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						font-weight: normal;
						color: rgb(7, 17, 27);
					}
					.desc,
					.extra {
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.desc {
						margin-bottom: 8px;
						line-height: 12px;
					}
					.extra {
						margin-bottom: 8px;
						.count {
							margin-right: 12px;
						}
					}
					.price {
						.new {
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240, 20, 20);
							font-weight: 700;
						}
						.old {
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147, 153, 159);
							font-weight: 700;
						}
					}
				}
			}
		}
	}
</style>