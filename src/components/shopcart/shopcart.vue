<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" 
						:class="{'high-light':totalCount>0}">
						<i class="icon-shopping_cart"
						   :class="{'high-light':totalCount>0}">
						</i>
					</div>
					<div class="num" 
						v-show="totalCount>0">
						{{totalCount}}
					</div>
				</div>
				<div class="price" 
					:class="{'high-light':totalCount>0}">
					{{totalPrice}}元</div>
			    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{this.payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			//选择的食物数量
			selectFoods:{
				type:Array,
				default(){
					return [
					   {
					  	price:10,
					    count:2
					   }
					];
				}
			},
			//配送费
			deliveryPrice:{
				type:Number,
				default:0
			},
			//起送价格
			minPrice:{
				type:Number,
				derault:0
			}
		},
		computed:{
			//实时计算总价
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			//实时计算数量
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			// 实时更新支付描述
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice < this.minPrice){
					let diff=this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				}else{
					return '去结算';
				}
			},
			// 实时更新支付样式
			payClass(){
				if(this.totalPrice < this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.shopcart{
	position:fixed;
	left:0;
	bottom:0;
	z-index:1;
	width:100%;
	height:48px;
	.content{
		display:flex;
		background:#141d27;
		height:48px;
		font-size: 0;
		color:rgba(255,255,255,0.4);
		.content-left{
			flex:1;
			.logo-wrapper{
				display:inline-block;
				vertical-align:top;
				position:relative;
				top:-10px;
				margin:0 12px;
				padding:6px;
				width:56px;
				height:56px;
				box-sizing:border-box;
				border-radius:50%;
				background:#141d27;
				.logo{
					width:100%;
					height:100%;
					border-radius:50%;
					background:#2b343c;
					text-align:center;
					&.high-light{
						background:rgb(0,160,220);
					}
					.icon-shopping_cart{
						line-height:44px;
						font-size:24px;
						color:#80858a;
						&.high-light{
						   color:#fff;
					    }
					}
				}
				.num{
					position:absolute;
					top:0;
					right:0;
					width:24px;
					height:16px;
					line-height: 16px;
					text-align:center;
					border-radius:16px;
					font-size:9px;
					font-weight:700;
					background:rgb(240,20,20);
					box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
				}
			}
			.price{
				display:inline-block;
				vertical-align:top;
				margin-top:12px;
				padding-right:12px;
				line-height:24px;
				border-right:1px solid rgba(255,255,255,0.1);
				font-size:16px;
				font-weight:700;
				&.high-light{
					color:#fff;
				}
			}
			.desc{
				display:inline-block;
				vertical-align:top;
				margin:12px 0 0 12px;
				line-height:24px;
				font-size:10px;
				font-weight:700;
			}
		}
		.content-right{
			flex:0 0 105px;
			width:105px;
			.pay{
				height:48px;
				line-height: 48px;
				text-align:center;
				font-size:12px;
				font-weight:700;
				&.not-enough{
					background:#2b343c;
				}
				&.enough{
					background:#00b43c;
					color:#fff;
				}
			}
		}
	}
}
</style>